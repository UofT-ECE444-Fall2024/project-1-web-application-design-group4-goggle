from rest_framework import generics, status, pagination, filters, views, mixins
from rest_framework.views import APIView
from rest_framework.serializers import ValidationError
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, BasePermission
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Value, CharField, F
from django.db.models.functions import Concat
import redis
import json
import base64 
from django.conf import settings
from .models import UofTUser
from .serializers import *
from .authentication import UofT_JWTAuthentication
from .utils import SEND_EMAIL
import json
import requests
import jwt
import os

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
        serialized_data = json.loads(json.dumps(serializer.data)) # convert the OrderedDict to a dict
        
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