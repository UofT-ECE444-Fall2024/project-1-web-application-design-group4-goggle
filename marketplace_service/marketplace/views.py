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
        # Automatically set the user_id to the currently logged-in user's ID.
        user_id = self.request.user.id  # Assuming `user.id` is a UUID or similar identifier
        serializer.save(user_id=user_id)
    
    @action(detail=False, methods=['get'])
    def my_products(self, request):
        # Custom endpoint to retrieve products for the authenticated user.
        user_id = request.user.id
        user_products = Product.objects.filter(user_id=user_id)
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
    
    def get_queryset(self):
        # Limit the queryset to only products that are active.
        return Product.objects.filter(status='active')
