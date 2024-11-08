# tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Category, Product, ProductImage
from django.contrib.auth.models import User
from PIL import Image
import tempfile

class CategoryModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Electronics")

    def test_category_creation(self):
        """Test that a Category instance is created with the correct attributes"""
        self.assertEqual(self.category.name, "Electronics")
        self.assertIsNotNone(self.category.slug)

    def test_subcategory(self):
        """Test that a subcategory can be created and associated with a parent category"""
        subcategory = Category.objects.create(name="Laptops", parent=self.category)
        self.assertEqual(subcategory.parent, self.category)


class ProductModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Furniture")
        self.user_id = 1  # assuming user_id from an external service
        self.product = Product.objects.create(
            user_id=self.user_id,
            title="Desk",
            description="Wooden office desk",
            price=150.00,
            location="Myhal",
            is_active=True
        )
        self.product.category.add(self.category)

    def test_product_creation(self):
        """Test that a Product instance is created with the correct attributes"""
        self.assertEqual(self.product.title, "Desk")
        self.assertTrue(self.product.is_active)
        self.assertEqual(self.product.price, 150.00)
        self.assertIn(self.category, self.product.category.all())

    def test_product_slug_generation(self):
        """Test that a slug is generated when saving a product"""
        self.assertIsNotNone(self.product.slug)


class ProductImageModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Books")
        self.product = Product.objects.create(
            user_id=1,
            title="Novel",
            price=10.00,
            location="Bahen"
        )

    def test_product_image_creation(self):
        """Test that a ProductImage instance can be created and validated"""
        with tempfile.NamedTemporaryFile(suffix=".jpg") as temp_image:
            image = Image.new("RGB", (200, 200))
            image.save(temp_image, format="JPEG")
            temp_image.seek(0)
            product_image = ProductImage.objects.create(
                product=self.product,
                image=temp_image.name
            )
            self.assertEqual(product_image.product, self.product)
            self.assertTrue(product_image.image.url)


class ProductViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.client.force_authenticate(user=self.user)
        self.category = Category.objects.create(name="Appliances")
        self.product = Product.objects.create(
            user_id=self.user.id,
            title="Blender",
            description="High-speed blender",
            price=50.00,
            location="Robarts"
        )
        self.product.category.add(self.category)

    def test_get_products(self):
        """Test that the product list API endpoint returns active products"""
        response = self.client.get(reverse("product-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(p["title"] == "Blender" for p in response.data))

    def test_mark_product_as_sold(self):
        """Test marking a product as sold"""
        url = reverse("product-mark-as-sold", args=[self.product.id])
        response = self.client.post(url)
        self.product.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.product.is_sold)

    def test_mark_product_as_active(self):
        """Test marking a product as active"""
        self.product.is_active = False
        self.product.save()
        url = reverse("product-mark-as-active", args=[self.product.id])
        print(f"Generated URL: {url}")
        response = self.client.post(url)
        self.product.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.product.is_active)

    def test_get_products_by_category(self):
        """Test filtering products by category slug"""
        url = reverse("product-by-category-slug", args=[self.category.slug])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(p["title"] == "Blender" for p in response.data))
