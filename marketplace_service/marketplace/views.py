# views.py
from rest_framework import viewsets, permissions, filters, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category, ProductImage
from .serializers import ProductSerializer, CategorySerializer, ProductImageSerializer
from django.db.models import Q


# Category ViewSet
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'  # Allows lookup by slug instead of ID
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']

# Product ViewSet
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'price', 'location', 'is_active', 'is_sold']
    search_fields = ['title', 'description']
    ordering_fields = ['price', 'date_posted']
    lookup_field = 'user_name'  # Allows lookup by slug instead of ID

    def get_queryset(self):
        # Limit the queryset to only products that are active by default.
        queryset = Product.objects.filter(is_active=True)
        return queryset

    @action(detail=False, methods=['get'])
    def my_products(self, request):
        # Custom endpoint to retrieve products for the authenticated user.
        user_name = request.query_params.get('user_name')
        user_products = Product.objects.filter(user_name=user_name)
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

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "id"

    #delete product
    def delete(self, request, *args, **kwargs):
        product = self.get_object()
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    #update product
    def put(self, request, *args, **kwargs):
        product = self.get_object()
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['user_name', 'title', 'description', 'price', 'location']
    ordering_fields = ['user_name', 'price', 'date_posted']
    filterset_fields = ['is_active', 'is_sold', 'date_posted']
    
    def get_queryset(self):
        queryset = super().get_queryset()

        # Get search query for title
        search_query = self.request.query_params.get('q')

        # Get priority field (title, user_name, etc.)
        priority = self.request.query_params.get('priority')

        # Get price range parameters
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        # Get price_order (ascending or descending)
        price_order = self.request.query_params.get('price_order', 'asc').lower()

        # Get locations from the URL (comma-separated)
        locations = self.request.query_params.get('locations')

        # Apply title search filter if query is provided
        if search_query:
            if priority == 'title' and queryset.filter(title__icontains=search_query).exists():
                queryset = queryset.filter(title__icontains=search_query)
            elif priority == 'user_name' and queryset.filter(user_name__icontains=search_query).exists():
                queryset = queryset.filter(user_name__icontains=search_query)
            elif priority == 'description' and queryset.filter(description__icontains=search_query).exists():
                queryset = queryset.filter(description__icontains=search_query)
            elif priority == 'price' and queryset.filter(price__icontains=search_query).exists():
                queryset = queryset.filter(price__icontains=search_query)
            elif priority == 'location' and queryset.filter(location__icontains=search_query).exists():
                queryset = queryset.filter(location__icontains=search_query)
            else:
                # Fall back on general search if no specific priority match
                queryset = queryset.filter(
                    Q(title__icontains=search_query) |
                    Q(user_name__icontains=search_query) |
                    Q(description__icontains=search_query) |
                    Q(price__icontains=search_query) |
                    Q(location__icontains=search_query)
                )

        # Apply price range filtering if parameters are provided and valid
        if min_price or max_price:
            try:
                if min_price:
                    min_price = float(min_price)
                    queryset = queryset.filter(price__gte=min_price)
                if max_price:
                    max_price = float(max_price)
                    queryset = queryset.filter(price__lte=max_price)
            except ValueError:
                # Skip price filter if invalid input, but don't modify the queryset
                pass  # Do nothing, just continue with the current queryset

        # Apply sorting by price if price_order is provided
        if price_order in ['asc', 'desc']:
            if price_order == 'asc':
                queryset = queryset.order_by('price')  # Lowest to highest
            elif price_order == 'desc':
                queryset = queryset.order_by('-price')  # Highest to lowest
        else:
            # Default sorting, in case price_order is invalid or not provided
            queryset = queryset.order_by("user_name")  # Default sort order

        # Apply location filtering if 'locations' parameter is provided
        if locations:
            location_list = locations.split(',')
            queryset = queryset.filter(location__in=location_list)

        return queryset

