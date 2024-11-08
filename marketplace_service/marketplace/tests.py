from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from .models import Product, Category, Rating
from django.contrib.auth.models import User
from .serializers import ProductSerializer, RatingSerializer
from rest_framework.response import Response

# -----------------------------------------
# Model Tests
# -----------------------------------------

class CategoryModelTest(TestCase):
    def test_category_creation(self):
        """Test category creation."""
        category = Category.objects.create(name="Electronics")
        self.assertEqual(category.name, "Electronics")


class ProductModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.category = Category.objects.create(name="Books")
        self.product = Product.objects.create(
            user=self.user,
            title="Test Product",
            description="This is a test product",
            price=100.00,
            category=self.category,
            location="Test Location",
            status="active"
        )

    def test_product_creation(self):
        """Test if the product is created correctly."""
        self.assertEqual(self.product.title, "Test Product")
        self.assertEqual(self.product.status, "active")
        self.assertEqual(self.product.user, self.user)

    def test_product_methods(self):
        """Test custom methods on Product."""
        self.assertTrue(self.product.is_active())
        self.product.mark_as_sold()
        self.assertEqual(self.product.status, "sold")
        self.assertTrue(self.product.is_sold())

# -----------------------------------------
# Serializer Tests
# -----------------------------------------

class ProductSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.category = Category.objects.create(name="Furniture")
        self.product = Product.objects.create(
            user=self.user,
            title="Chair",
            description="Comfortable chair",
            price=49.99,
            category=self.category,
            location="Test Location",
            status="active"
        )
        self.serializer = ProductSerializer(instance=self.product)

    def test_serializer_contains_expected_fields(self):
        """Test that serializer has the expected fields."""
        data = self.serializer.data
        self.assertEqual(set(data.keys()), {"id", "user", "title", "description", "price", "category", "location", "date_posted", "status", "images", "rating"})

    def test_price_validation(self):
        """Test that price validation works."""
        data = self.serializer.data
        data['price'] = -10  # Invalid price
        serializer = ProductSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors), {'price'})

# -----------------------------------------
# View Tests
# -----------------------------------------

class ProductViewSetTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.category = Category.objects.create(name="Books")
        self.client.login(username="testuser", password="testpass")
        self.product_data = {
            "title": "New Product",
            "description": "Product description",
            "price": "19.99",
            "category": self.category.id,
            "location": "Test Location",
            "status": "active"
        }

    def test_create_product(self):
        """Test creating a new product."""
        url = reverse("product-list")
        response = self.client.post(url, self.product_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().title, "New Product")

    def test_retrieve_product(self):
        """Test retrieving a product."""
        product = Product.objects.create(user=self.user, **self.product_data)
        url = reverse("product-detail", args=[product.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], product.title)

    def test_list_products(self):
        """Test listing all products."""
        Product.objects.create(user=self.user, **self.product_data)
        url = reverse("product-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_filter_products_by_category(self):
        """Test filtering products by category."""
        Product.objects.create(user=self.user, **self.product_data)
        url = reverse("product-list") + f"?category={self.category.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_custom_view_my_products(self):
        """Test custom endpoint for listing user's products."""
        product = Product.objects.create(user=self.user, **self.product_data)
        url = reverse("product-my_products")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], product.title)

# -----------------------------------------
# Custom Method Tests
# -----------------------------------------

class ProductCustomMethodTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.category = Category.objects.create(name="Sports")
        self.product = Product.objects.create(
            user=self.user,
            title="Football",
            description="A standard football",
            price=29.99,
            category=self.category,
            location="Sports Center",
            status="active"
        )

    def test_mark_as_sold_method(self):
        """Test that the mark_as_sold method correctly updates product status."""
        self.product.mark_as_sold()
        self.assertEqual(self.product.status, "sold")
