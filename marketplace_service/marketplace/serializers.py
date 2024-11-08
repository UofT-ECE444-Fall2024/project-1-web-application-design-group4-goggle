# serializers.py
from rest_framework import serializers
from .models import Product, ProductImage, Category

class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    subcategories = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'slug']
    
    def get_subcategories(self, obj):
        children = obj.subcategories.all()
        return CategorySerializer(children, many=True).data

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    title = serializers.CharField(max_length=255, required=True)
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    location = serializers.CharField(max_length=255, required=True)
    date_posted = serializers.DateTimeField(read_only=True)
    status = serializers.ChoiceField(choices=[('active', 'Active'), ('sold', 'Sold')], default='active')

    class Meta:
        model = Product
        fields = ['id', 'user_id', 'title', 'description', 'price', 'category', 'location', 'date_posted', 'status', 'images']
        read_only_fields = ['user_id', 'date_posted', 'status']
    
    def create(self, validated_data):
        # Assign the user_id from request context, assuming user_id is available from an authentication layer
        user_id = self.context['request'].user.id if 'request' in self.context else None
        if not user_id:
            raise serializers.ValidationError("User must be authenticated.")

        validated_data['user_id'] = user_id  # Set user_id to the current authenticated user
        images_data = self.context.get('view').request.FILES
        product = Product.objects.create(**validated_data)
        
        self._create_product_images(product, images_data)
        return product
    
    def update(self, instance, validated_data):
        images_data = self.context.get('view').request.FILES
        self._create_product_images(instance, images_data)
        
        for k, v in validated_data.items():
            setattr(instance, k, v)
        instance.save()
        return instance

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price must be a positive number.")
        return value

    def _create_product_images(self, product, images_data):
        """Helper method to create ProductImage instances for a product."""
        for image_data in images_data.values():
            ProductImage.objects.create(product=product, image=image_data)