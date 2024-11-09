# views.py
from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category, ProductImage
from .serializers import ProductSerializer, CategorySerializer, ProductImageSerializer


# Category ViewSet
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'  # Allows lookup by slug instead of ID


# Product ViewSet
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'price', 'location', 'is_active', 'is_sold']
    search_fields = ['title', 'description']
    ordering_fields = ['price', 'date_posted']

    def perform_create(self, serializer):
        # Automatically set the user_id to the currently logged-in user's ID.
        user_id = self.request.user.id
        serializer.save(user_id=user_id)

    def get_queryset(self):
        # Limit the queryset to only products that are active by default.
        queryset = Product.objects.filter(is_active=True)
        return queryset

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
        product.is_sold = True
        product.save()
        return Response({'status': 'Product marked as sold'})

    @action(detail=True, methods=['post'])
    def mark_as_active(self, request, pk=None):
        # Custom endpoint to mark a product as active.
        product = self.get_object()
        product.is_active = True
        product.save()
        return Response({'status': 'Product marked as active'})

    @action(detail=False, methods=['get'], url_path='by-category/(?P<slug>[^/.]+)')
    # Custom endpoint to retrieve products by category slug.
    def by_category_slug(self, request, slug=None):
        products = Product.objects.filter(category__slug=slug, is_active=True)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)



# ProductImage ViewSet
class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

    def perform_create(self, serializer):
        # Set the product context for the image being uploaded
        product_id = self.request.data.get('product')
        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
            serializer.save(product=product)
        except Product.DoesNotExist:
            return Response({'error': 'Invalid product ID'}, status=status.HTTP_404_NOT_FOUND)