# serializers.py
from rest_framework import serializers
from .models import Product, ProductImage, Category
import requests

class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField('get_subcategories')

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'slug', 'subcategories']
        extra_kwargs = {
            'parent': {'required': False},
            'slug': {'read_only': True},
            'id': {'read_only': True},
        }
    
    def get_subcategories(self, obj):
        children = obj.subcategories.all()
        if children.exists():
            serializer = CategorySerializer(children, many=True)
            return serializer.data
        return None


class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'image_url']
        extra_kwargs = {
            'id': {'read_only': True},
        }
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            image_url = obj.image_url
            if request is not None:
                return request.build_absolute_uri(image_url)
            return image_url
        return None

class ProductSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField('get_user_profile')

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
            'user_profile',
            ]
        extra_kwargs = {
            'id': {'read_only': True},
            'location': {'required': True},
            'date_posted': {'read_only': True},
            'slug': {'read_only': True},
            'is_active': {'read_only': True},
            'is_sold': {'read_only': True},
        }
    
    # Get user profile from the identity service given the user_id
    def get_user_profile(self, obj):
        user_id = obj.user_id
        
        if user_id is None:
            return None
        
        url = f'http://localhost:12000/users/{user_id}/' # store in env variable

        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as errh:
            return {'error': f"HTTP Error: {str(errh)}"}
        except requests.exceptions.ConnectionError as errc:
            return {'error': f"Error Connecting: {str(errc)}"}
        except requests.exceptions.Timeout as errt:
            return {'error': f"Timeout Error: {str(errt)}"}
        except requests.exceptions.RequestException as err:
            return {'error': f"Request Exception: {str(err)}"}