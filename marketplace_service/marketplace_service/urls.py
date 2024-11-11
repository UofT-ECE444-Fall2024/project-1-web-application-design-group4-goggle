"""
URL configuration for marketplace_service project.
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from marketplace.views import ProductViewSet, CategoryViewSet, ProductImageViewSet, ProductDetail, ProductList
from django.conf.urls.static import static
from marketplace_service import settings

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'product-images', ProductImageViewSet)

'''
GET /products/ - List all products.
POST /products/ - Create a new product (only available for authenticated users).
GET /products/<id>/ - Retrieve a specific product by its ID.
PUT /products/<id>/ - Update a specific product (only available for the product's owner).
DELETE /products/<id>/ - Delete a specific product (only available for the product's owner).
GET /products/my_products/ - Custom action to list products created by the authenticated user.
POST /products/<id>/mark_as_sold/ - Custom action to mark a specific product as sold (only available for the product's owner).
POST /products/<id>/mark_as_active/ - Custom action to mark a specific product as active (only available for the product's owner).
'''

urlpatterns = [
    path('', include(router.urls)),
    path('product-list', ProductList.as_view(), name='product-list'),
    path('product-detail/<int:id>', ProductDetail.as_view(), name='product-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)