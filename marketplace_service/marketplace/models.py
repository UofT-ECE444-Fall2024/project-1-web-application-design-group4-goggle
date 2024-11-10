from django.db import models
from django.core.exceptions import ValidationError
from PIL import Image
from django.utils.text import slugify
import os

def validate_image(image):
    # Validate file type based on the file extension
    valid_extensions = ['.jpg', '.jpeg', '.png']
    file_extension = os.path.splitext(image.name)[1].lower()
    if file_extension not in valid_extensions:
        raise ValidationError(f'Unsupported file type: {file_extension}. Allowed types: JPEG, PNG.')

    # Validate file size
    max_file_size = 5 * 1024 * 1024  # 5 MB limit
    if image.size > max_file_size:
        raise ValidationError(f'File size exceeds {max_file_size / (1024 * 1024)} MB.')

    # Validate image dimensions
    try:
        with Image.open(image) as img:
            img.verify()  # Verify that it’s a valid image format
            max_width, max_height, min_width, min_height = 5000, 5000, 500, 500
            if img.width > max_width or img.height > max_height:
                raise ValidationError(f'Image dimensions exceed {max_width}x{max_height}px.')
            if img.width < min_width or img.height < min_height:
                raise ValidationError(f'Image dimensions must be at least {min_width}x{min_height}px.')
    except Exception:
        raise ValidationError('Invalid image file.')

class Category(models.Model):
    CATEGORY_CHOICES = [
        ('Electronics', 'Electronics'),
        ('Books', 'Books'),
        ('Clothing', 'Clothing'),
        ('Furniture', 'Furniture'),
        ('Miscellaneous', 'Miscellaneous'),
    ]

    id              = models.AutoField(primary_key=True)
    name            = models.CharField(max_length=16, choices=CATEGORY_CHOICES, default='Miscellaneous')
    slug            = models.SlugField(max_length=255, unique=True, blank=True) # Unique slug for SEO-friendly URLs

    class Meta:
        ordering = ['name'] # Sort categories alphabetically
        verbose_name_plural = 'categories'
        verbose_name = 'category'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Category.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        self.full_clean()
        super().save(*args, **kwargs)

class Product(models.Model):
    # University of Toronto Location Choices
    LOCATION_CHOICES = [
        ('Myhal', 'Myhal Centre for Engineering Innovation & Entrepreneurship'),
        ('Bahen', 'Bahen Centre for Information Technology'),
        ('Gerstein', 'Gerstein Science Information Centre'),
        ('Robarts', 'Robarts Library'),
        ('SidneySmith', 'Sidney Smith Hall'),
        ('MedicalScience', 'Medical Sciences Building'),
        ('Other', 'Other')
    ]

    user_name         = models.CharField(max_length=100)
    id              = models.AutoField(primary_key=True)
    title           = models.CharField(max_length=255)
    description     = models.TextField(blank=True)
    price           = models.DecimalField(max_digits=10, decimal_places=2)
    category        = models.ManyToManyField(Category, related_name='products')
    location        = models.CharField(max_length=16, choices=LOCATION_CHOICES, default='Myhal')
    date_posted     = models.DateTimeField(auto_now_add=True)
    is_active       = models.BooleanField(default=True)
    is_sold         = models.BooleanField(default=False)
    slug            = models.SlugField(max_length=255, unique=True, blank=True) # Unique slug for SEO-friendly URLs

    class Meta:
        ordering = ['-date_posted']
        verbose_name_plural = 'products'
        verbose_name = 'product'

    def __str__(self):
        return f"{self.title} - {str(self.id)}"

    def clean(self):
        if self.price < 0:
            raise ValidationError('Price must be a positive number.')
        super().clean()

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        self.full_clean()
        super().save(*args, **kwargs)

class ProductImage(models.Model):
    id              = models.AutoField(primary_key=True)
    product         = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image           = models.ImageField(upload_to='product_images/', validators=[validate_image])
    alt_text        = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'product image'
        verbose_name_plural = 'product images'

    def __str__(self):
        return f"Image for {self.product.title}"

    @property
    def image_url(self):
        return self.image.url