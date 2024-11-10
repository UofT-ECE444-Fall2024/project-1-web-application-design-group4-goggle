# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError, ParseError
from rest_framework.response import Response
import secrets
from django.conf import settings
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
from .tasks import sendEmail as sendEmailTask
import os
from PIL import Image

def GEN_SECRET(length=32):
    return secrets.token_hex(length)

def GET_KEY_OR_404(request, key):
    x = request.data.get(key)
    if x == None:
        raise ParseError()
    return x

def CHECK_PASSWORD(password:str):
    """ Checks if the password is valid or not. It must fit the following 
    criteria:
    - At least 8 characters long
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    - At least one special character

    Args:
        password (str): proposed password
        
    Returns:
        bool: True if the password is valid, False otherwise
    """
    
    if password is None:
        return False
    
    if len(password) < 8:
        return False
    
    # Check if there is at least one upper or lower character
    if password.islower() or password.isupper():
        return False
    
    # Check that there is at least one special character
    if password.isalnum():
        return False
    
    if not any(char.isdigit() for char in password):
        return False
    
    return True

def SEND_EMAIL(to:str, subject:str, html:str):
    msg = MIMEMultipart()    
    msg['From'] = settings.SMTP_USERNAME
    msg['To'] = to
    msg['Subject'] = subject
    msg.attach(MIMEText(html, 'html'))
    
    try:
        sendEmailTask.delay(to, settings.SMTP_HOSTNAME, settings.SMTP_USERNAME, settings.SMTP_PASSWORD, settings.SMTP_PORT, msg.as_string())
        return ({}, 200)
    except:
        return ({}, 424)
    
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