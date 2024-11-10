from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import UofTUser
from .serializers import *
from unittest.mock import patch

class UserDetailViewTest(APITestCase):
    def setUp(self):
        self.user = UofTUser.objects.create(email="test@mail.utoronto.ca", first_name="Test", last_name="User")
    
    def test_get_user_detail(self):
        """Test retrieving user details by email"""
        url = reverse("info", args=[self.user.email])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.user.email)

class UserListViewTest(APITestCase):
    def setUp(self):
        UofTUser.objects.create(email="test1@mail.utoronto.ca", user_name="Alice", first_name="Alice", last_name="Smith")
        UofTUser.objects.create(email="test2@mail.utoronto.ca", user_name="Bob", first_name="Bob", last_name="Jones")
    
    def test_list_users(self):
        """Test listing all users"""
        url = reverse("user-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
    
    def test_search_users(self):
        """Test searching users by first name"""
        url = reverse("user-list") + "?q=Alice"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["first_name"], "Alice")

class UserNameViewTest(APITestCase):
    def setUp(self):
        self.user = UofTUser.objects.create(email="user@mail.utoronto.ca", first_name="Test", last_name="User", password="password123")

    def test_get_user_name(self):
        """Test retrieving user's full name and registration status by email"""
        url = reverse("name", args=[self.user.email])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["full_name"], self.user.get_full_name())

class AuthenticateTokenViewTest(APITestCase):
    def setUp(self):
        self.user = UofTUser.objects.create(email="auth@mail.utoronto.ca", first_name="Auth", last_name="User")
        self.client.force_authenticate(user=self.user)

    def test_authenticate_token(self):
        """Test authenticating user token"""
        url = reverse("auth")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("X-Identity", response)

class RegisterUserViewTest(APITestCase):
    def test_register_user(self):
        """Test successful registration with valid data"""
        url = reverse("register")
        data = {
            "email": "newuser@mail.utoronto.ca",
            "first_name": "New",
            "last_name": "User",
            "user_name": "newuser",
            "password": "Password1!!!",
            "password_confirmation": "Password1!!!"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("token", response.data)

    def test_register_user_password_mismatch(self):
        """Test registration failure when passwords do not match"""
        url = reverse("register")
        data = {
            "email": "newuser@mail.utoronto.ca",
            "first_name": "New",
            "last_name": "User",
            "user_name": "newuser",
            "password": "Password1!!!",
            "password_confirmation": "password1!!!"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_register_user_missing_fields(self):
        """Test registration failure when required fields are missing"""
        url = reverse("register")
        data = {
            "email": "newuser@mail.utoronto.ca",
            "password": "Password1!!!",
            "password_confirmation": "Password1!!!"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("first_name", response.data)
        self.assertIn("last_name", response.data)
        self.assertIn("user_name", response.data)

    def test_register_user_invalid_password_format(self):
        """Test registration failure with an invalid password format"""
        url = reverse("register")
        data = {
            "email": "newuser@mail.utoronto.ca",
            "first_name": "New",
            "last_name": "User",
            "user_name": "newuser",
            "password": "password",
            "password_confirmation": "password"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_register_user_duplicate_email(self):
        """Test registration failure when email is already registered"""
        url = reverse("register")
        data = {
            "email": "duplicate@mail.utoronto.ca",
            "first_name": "Existing",
            "last_name": "User",
            "user_name": "existinguser",
            "password": "Password1!!!",
            "password_confirmation": "Password1!!!"
        }
        self.client.post(url, data)
        
        data["user_name"] = "newuser"
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

class LoginViewTest(APITestCase):
    def setUp(self):
        self.user = UofTUser.objects.create(email="login@mail.utoronto.ca", first_name="Login", last_name="User")
        self.user.set_password("password123")
        self.user.save()

    def test_login_user_success(self):
        """Test login with correct credentials"""
        url = reverse("login")
        data = {"email": "login@mail.utoronto.ca", "password": "password123"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)

    def test_login_user_fail(self):
        """Test login with incorrect credentials"""
        url = reverse("login")
        data = {"email": "login@mail.utoronto.ca", "password": "wrongpassword"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class ResetCodeViewTest(APITestCase):
    @patch("identity.utils.SEND_EMAIL")
    def test_send_reset_code(self, mock_send_email):
        """Test sending a reset code via email"""
        user = UofTUser.objects.create(email="reset@mail.utoronto.ca", password="password")
        url = reverse("reset-code", args=[user.email])
        mock_send_email.return_value = (None, status.HTTP_200_OK)
        
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class PasswordResetViewTest(APITestCase):
    def setUp(self):
        self.user = UofTUser.objects.create(email="reset@mail.utoronto.ca", password="Password1!!!", reset_code="reset123")
        self.url = reverse("password-reset", args=[self.user.email])

    def test_reset_password_success(self):
        """Test password reset with correct reset code"""
        data = {
            "reset_code": "reset123",
            "new_password": "Password!!!1",
            "new_password_confirmation": "Password!!!1"
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_reset_password_code_mismatch(self):
        """Test password reset with incorrect reset code"""
        data = {
            "reset_code": "wrongcode",
            "new_password": "Password!!!1",
            "new_password_confirmation": "Password!!!1"
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class ChangePasswordViewTest(APITestCase):
    def setUp(self):
        self.user = UofTUser.objects.create(email="changepass@mail.utoronto.ca")
        self.user.set_password("Password1!!!")
        self.user.save()
        self.client.force_authenticate(user=self.user)

    def test_change_password_success(self):
        """Test changing password with matching new passwords"""
        url = reverse("change-password", args=[self.user.email])
        data = {
            "email": f"{self.user.email}",
            "new_password": "Password!!!1",
            "new_password_confirmation": "Password!!!1"
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_change_password_mismatch(self):
        """Test changing password with mismatched new passwords"""
        url = reverse("change-password", args=[self.user.email])
        data = {
            "email": f"{self.user.email}",
            "new_password": "Password!!!1",
            "new_password_confirmation": "differentpassword"
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)