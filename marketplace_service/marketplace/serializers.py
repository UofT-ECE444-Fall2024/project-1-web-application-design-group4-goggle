# serializers.py
from rest_framework import serializers
from .models import Product, ProductImage, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name','slug']
        extra_kwargs = {
            'slug': {'read_only': True},
            'id': {'read_only': True},
        }


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']
        extra_kwargs = {
            'id': {'read_only': True},
        }

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'user_id', 
            'id', 
            'title', 
            'description', 
            'price', 
            'category', 
            'location', 
            'date_posted', 
            'is_active', 
            'is_sold', 
            'slug',
            'images'
            ]
        extra_kwargs = {
            'id': {'read_only': True},
            'location': {'required': True},
            'date_posted': {'read_only': True},
            'slug': {'read_only': True},
            'is_active': {'read_only': True},
            'is_sold': {'read_only': True},
        }