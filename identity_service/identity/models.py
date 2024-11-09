from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.core.validators import EmailValidator
from django.utils.timezone import now
from phonenumber_field.modelfields import PhoneNumberField


class UofTUser(AbstractBaseUser):
        
    # Essential fields
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True, validators=[EmailValidator(message="Invalid email address")], primary_key=True)    
    phone_number = PhoneNumberField(blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    rating_count = models.IntegerField(default=0)
    
    # Meta fields
    reset_code = models.CharField(max_length=64, unique=True, blank=True, null=True)
    last_reset = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    time_created = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
        
    def __str__(self):
        return self.get_full_name() + " (" + self.email + ")"
        
    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_reset_code(self):
        return self.reset_code

    def set_reset_code(self, code):
        self.reset_code = code
        
    def update_last_reset(self):
        self.last_reset = now()