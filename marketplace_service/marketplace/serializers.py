# serializers.py
from rest_framework import serializers
from .models import Product, ProductImage, Category, Rating

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    title = serializers.CharField(max_length=255, required=True)
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    rating = serializers.DecimalField(max_digits=1, decimal_places=1, required=False)
    location = serializers.CharField(max_length=255, required=True)
    date_posted = serializers.DateTimeField(read_only=True)
    status = serializers.ChoiceField(choices=[('active', 'Active'), ('sold', 'Sold')], default='active')
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'user', 'title', 'description', 'price', 'category', 'location', 'date_posted', 'status', 'images', 'rating']
        read_only_fields = ['user', 'date_posted', 'status']
    
    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        product = Product.objects.create(**validated_data)
        for image_data in images_data.values():
            ProductImage.objects.create(product=product, image=image_data)
        return product
    
    def update(self, instance, validated_data):
        images_data = self.context.get('view').request.FILES
        for image_data in images_data.values():
            ProductImage.objects.create(product=instance, image=image_data)
        for k,v in validated_data.items():
            setattr(instance, k, v)
        instance.save()
        return instance
    
    def validate_rating(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value
    
    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price must be a positive number.")
        return value
    
    def get_average_rating(self, obj):
        ratings = Rating.objects.filter(product=obj)
        if ratings.count() == 0:
            return None
        total = 0
        for rating in ratings:
            total += rating.rating
        return total / ratings.count()

class RatingSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    rating = serializers.DecimalField(max_digits=1, decimal_places=1)

    class Meta:
        model = Rating
        fields = ['id', 'user', 'product', 'rating']

    def validate_rating(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value