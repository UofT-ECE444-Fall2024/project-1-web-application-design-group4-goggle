# views.py
from rest_framework import viewsets, permissions
from .models import Product
from .serializers import ProductSerializer
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
