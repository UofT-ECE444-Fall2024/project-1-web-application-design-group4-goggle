from django.db import models

# Due to microservice architecture, we cannot import the User model from identity_service directly
# from identity_service.identity.models import UofTUser as User
#

class Category(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='subcategories', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    user = models.CharField(max_length=255) # Needs to be updated to fit the microservice architecture
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    location = models.CharField(max_length=255)
    date_posted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('sold', 'Sold')])

    def __str__(self):
        return self.title
    
    def is_active(self):
        return self.status == 'active'
    
    def is_sold(self):
        return self.status == 'sold'
    
    def mark_as_sold(self):
        self.status = 'sold'
        self.save()
    
    def mark_as_active(self):
        self.status = 'active'
        self.save()
    
    def get_price(self):
        return self.price
    
    def get_title(self):
        return self.title
    
    def get_description(self):
        return self.description
    
    def get_category(self):
        return self.category
    
    def get_location(self):
        return self.location
    
    def get_date_posted(self):
        return self.date_posted

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.product.title}"
    
    def get_image_url(self):
        return self.image.url
    
    def get_product(self):
        return self.product
    
    def get_image(self):
        return self.image
    
    def set_image(self, image):
        self.image = image
        self.save()

class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="ratings")
    user = models.CharField(max_length=255)  # Needs to be updated to fit the microservice architecture
    score = models.PositiveSmallIntegerField()  # Rating from 1 to 5
    review = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('product', 'user')
