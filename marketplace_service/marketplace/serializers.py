# serializers.py
from rest_framework import serializers
from .models import Product, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'user', 'title', 'description', 'price', 'category', 'location', 'date_posted', 'status', 'images']
        read_only_fields = ['user', 'date_posted', 'status']
