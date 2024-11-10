from rest_framework import generics, status, pagination, filters, views, mixins, viewsets
from rest_framework.views import APIView
from rest_framework.serializers import ValidationError
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Value, CharField, F
from django.db.models.functions import Concat
import redis
import json
import base64 
from django.conf import settings
from .models import UofTUser, Conversation, Message
from .serializers import *
from .authentication import UofT_JWTAuthentication
from .utils import SEND_EMAIL
import json
import requests
import jwt
import os
from rest_framework.parsers import MultiPartParser, FormParser

cache = redis.StrictRedis(host="redis",
                    port=6379,
                    db=0,
                    charset="utf-8",
                    decode_responses=True)
class UserDetail(generics.RetrieveAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = UofTUserFeaturesSerializer
    lookup_field = "email"

class UserList(generics.ListAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = UofTUserFeaturesSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend]
    search_fields = {'first_name', 'last_name', 'email', 'phone_number', 'full_name'}
    ordering_fields = {'first_name', 'last_name', 'phone_number', 'time_created'}
    
    def get_queryset(self):
        queryset = UofTUser.objects.all()
        search_query = self.request.query_params.get('q')
        
        if search_query:
            queryset = queryset.annotate(
                full_name=Concat(F('first_name'), Value(' '), F('last_name'), output_field=CharField())
            ).filter(
                Q(first_name__icontains=search_query) |
                Q(last_name__icontains=search_query) |
                Q(email__icontains=search_query) |
                Q(phone_number__icontains=search_query) |
                Q(full_name__icontains=search_query)
            )
        return queryset.order_by("first_name")

class UserImageViewSet(viewsets.ModelViewSet):
    queryset = UserImage.objects.all()
    serializer_class = UserImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        # Set the user context for the image being uploaded
        user_id = self.request.data.get('user_name')
        if not user_id:
            raise serializers.ValidationError({'error': 'User ID is required'})

        try:
            user = UofTUser.objects.get(user_name=user_id)
            serializer.save(user=user)
        except UofTUser.DoesNotExist:
            raise serializers.ValidationError({'error': 'Invalid User ID'})
    
class UserName(generics.GenericAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = UofTUserSerializer
    authentication_classes = []
    lookup_field = "email"
    
    def get(self, request, *args, **kwargs):
        user = self.get_object()
        full_name = user.get_full_name()
        user_data = self.get_serializer(user).data
        registeredStatus = user.password != ""
        return Response({
                            "full_name": full_name,
                            "first_name": user_data["first_name"],
                            "last_name": user_data["last_name"],
                            "registered": registeredStatus,
                        }, 
                        status=status.HTTP_200_OK)

class AuthenticateToken(generics.RetrieveAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = UofTUserFeaturesSerializer
    authentication_classes = [UofT_JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        caller = request.user
        serializer = self.get_serializer(caller)      
        serialized_data = json.loads(json.dumps(serializer.data)) # convert the OrderedDict to a 
        response = Response(
            status=status.HTTP_200_OK,
            data="A man's flesh is his own; the water belongs to the tribe."
        )
        
        response['X-Identity'] = json.dumps(serialized_data)
        return response
            
class RegisterUserView(generics.CreateAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = RegistrationSerializer
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        ser = RegistrationSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        instance = ser.create(ser.validated_data)
        serialized_data = UofTUserFeaturesSerializer(instance = instance).data.copy()
        serialized_data["token"] = UofT_JWTAuthentication.create_jwt(instance)
        return Response(data=serialized_data, status=status.HTTP_201_CREATED)
    
class LoginView(generics.CreateAPIView):    
    queryset = UofTUser.objects.all()
    authentication_classes = []
    
    def post(self, request, *args, **kwargs):
        ser = LoginSerializer(data=request.data)
        try:
            ser.is_valid(raise_exception=True)
            instance = UofTUser.objects.get(email=ser.validated_data["email"])
            if instance.check_password(ser.validated_data["password"]):
                serialized_data = UofTUserFeaturesSerializer(instance=instance).data.copy()
                serialized_data["token"] = UofT_JWTAuthentication.create_jwt(instance)
                return Response(data=serialized_data, status=status.HTTP_200_OK)
        except Exception: pass
        return Response(data={}, status=status.HTTP_401_UNAUTHORIZED)
    
class ResetCodeView(generics.RetrieveAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = UofTUserResetCodeSerializer
    authentication_classes = []
    # permission_classes = []
    lookup_field = "email"
    
    def get(self, request, *args, **kwargs):
        user = self.get_object()
        enc_email = base64.b64encode(bytes(user.email, 'utf-8'))
        if user.password == "": return Response(status=status.HTTP_400_BAD_REQUEST)
        url = f"{settings.SCHEME}://{settings.HOST_ADDRESS}/set-password/{enc_email.decode()}/{user.get_reset_code()}"
        email_body = f"<html><h1>Hello {user.get_full_name()},</h1>"
        email_body += f"<p>You requested a link to reset your UofTrade password. Follow the link below to reset:</p>"
        email_body += f"<p><a href=\"{url}\">{url}</a></p></html>"
        _, email_status = SEND_EMAIL(user.email, "UofTrade Password Reset", email_body)
        return Response(status=email_status)
    
class PasswordResetView(generics.UpdateAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = PasswordResetSerializer
    authentication_classes = []
    # permission_classes = []
    lookup_field = "email"
    
class ChangePasswordView(generics.UpdateAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = ChangePasswordSerializer
    # permission_classes = [ChangePasswordPermission]
    lookup_field = "email"

class CreateConversationView(APIView):
    def post(self, request):
        user1_email = request.data.get('user1')
        user2_email = request.data.get('user2')

        user1 = UofTUser.objects.get(email=user1_email)
        user2 = UofTUser.objects.get(email=user2_email)

        conversation = Conversation.objects.filter(participants=user1).filter(participants=user2).first()
        if not conversation:
            conversation = Conversation.objects.create()
            conversation.participants.add(user1, user2)

        return Response({"conversation_id": conversation.id}, status=status.HTTP_201_CREATED)

class ConversationListView(APIView):
    def get(self, request):
        user = request.user
        conversations = Conversation.objects.filter(participants=user).prefetch_related('messages')
        
        data = []
        for convo in conversations:
            last_message = convo.messages.order_by('-timestamp').first()
            unread_count = convo.messages.filter(is_read=False).exclude(sender=user).count()
            other_participants = convo.participants.exclude(id=user.id)
            
            data.append({
                "conversation_id": convo.id,
                "last_message": last_message.content if last_message else "",
                "last_message_timestamp": last_message.timestamp if last_message else None,
                "unread_count": unread_count,
                "participants": [{"user_name": p.user_name, "name": p.get_full_name()} for p in other_participants]
            })

        return Response(data)

class MessagePagination(PageNumberPagination):
    page_size = 20

class MessageHistoryView(ListAPIView):
    serializer_class = MessageSerializer
    pagination_class = MessagePagination

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        return Message.objects.filter(conversation_id=conversation_id).order_by('-timestamp')

class SendMessageView(APIView):
    def post(self, request, conversation_id):
        user = request.user
        content = request.data.get('content')

        conversation = Conversation.objects.get(id=conversation_id)
        message = Message.objects.create(conversation=conversation, sender=user, content=content)

        conversation.updated_at = message.timestamp
        conversation.save()

        return Response({"message_id": message.id, "timestamp": message.timestamp}, status=status.HTTP_201_CREATED)

class MarkMessagesAsReadView(APIView):
    def post(self, request, conversation_id):
        user = request.user
        conversation = Conversation.objects.get(id=conversation_id)
        conversation.messages.filter(is_read=False).exclude(sender=user).update(is_read=True)
        return Response({"status": "success"})
      
class UpdateRatingView(generics.UpdateAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = UofTUserFeaturesSerializer
    # permission_classes = [RatingPermission]
    lookup_field = "email"

    def post(self, request, *args, **kwargs):
        user = self.get_object()
        user.rating = (user.rating * user.rating_count + request.data["rating"]) / (user.rating_count + 1)
        user.rating_count += 1
        user.save()
        return Response(status=status.HTTP_200_OK)
    
class GetRatingView(generics.RetrieveAPIView):
    queryset = UofTUser.objects.all()
    serializer_class = UofTUserFeaturesSerializer
    lookup_field = "email"
    
    def get(self, request, *args, **kwargs):
        user = self.get_object()
        return Response(data=user.rating, status=status.HTTP_200_OK)
