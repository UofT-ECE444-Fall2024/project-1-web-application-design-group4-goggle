from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.core.validators import EmailValidator
from django.utils.timezone import now
from phonenumber_field.modelfields import PhoneNumberField
from .utils import validate_image
from PIL import Image


class UofTUser(AbstractBaseUser):
        
    # Essential fields
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100, unique=True)
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

class Conversation(models.Model):
    participants = models.ManyToManyField(UofTUser)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Conversation between {', '.join([p.email for p in self.participants.all()])}"

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(UofTUser, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)  # For read receipts

    def __str__(self):
        return f"Message from {self.sender.email} at {self.timestamp}"

class UserImage(models.Model):
    id              = models.AutoField(primary_key=True)
    user            = models.ForeignKey(UofTUser, related_name='images', on_delete=models.CASCADE)
    image           = models.ImageField(upload_to='profile_images/', validators=[validate_image])
    alt_text        = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'profile image'
        verbose_name_plural = 'profile images'

    def __str__(self):
        return f"Image for {self.user.user_name}"

    @property
    def image_url(self):
        return self.image.url