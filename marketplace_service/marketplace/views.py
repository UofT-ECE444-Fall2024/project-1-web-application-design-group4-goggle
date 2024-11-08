# views.py
from rest_framework import viewsets, permissions
from .models import Product, Rating
from .serializers import ProductSerializer, RatingSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'price', 'location']
    search_fields = ['title', 'description']
    ordering_fields = ['price', 'date_posted']

    def perform_create(self, serializer):
        # Automatically set the user to the currently logged-in user when a product is created.
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_products(self, request):
        # Custom endpoint to retrieve products for the authenticated user.
        user_products = Product.objects.filter(user=request.user)
        serializer = self.get_serializer(user_products, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_as_sold(self, request, pk=None):
        # Custom endpoint to mark a product as sold.
        product = self.get_object()
        product.mark_as_sold()
        return Response({'status': 'sold'})
    
    @action(detail=True, methods=['post'])
    def mark_as_active(self, request, pk=None):
        # Custom endpoint to mark a product as active.
        product = self.get_object()
        product.mark_as_active()
        return Response({'status': 'active'})
    
    @action(detail=True, methods=['get'])
    def ratings(self, request, pk=None):
        # Custom endpoint to retrieve ratings for a specific product.
        product = self.get_object()
        ratings = Rating.objects.filter(product=product)
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def rate(self, request, pk=None):
        # Custom endpoint to rate a product.
        product = self.get_object()
        data = request.data
        data['product'] = product.id
        serializer = RatingSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def get_queryset(self):
        # Limit the queryset to only products that are active.
        return Product.objects.filter(status='active')
    
class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product', 'user']

    def perform_create(self, serializer):
        # Automatically set the user to the currently logged-in user when a rating is created.
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        # Limit the queryset to only ratings for products that are active.
        return Rating.objects.filter(product__status='active')