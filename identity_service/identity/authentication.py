from django.conf import settings
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed
from datetime import datetime, timedelta
import jwt
import redis
from .models import UofTUser

cache = redis.StrictRedis(host="redis",
                          port=6379,
                          db=0,
                          charset="utf-8",
                          decode_responses=True)

class UofT_JWTAuthentication(authentication.BaseAuthentication):
    
    def authenticate(self, request):
        # Extract the JWT from the Authorization header
        jwt_token = request.META.get('HTTP_AUTHORIZATION')
        if jwt_token is None:
            raise AuthenticationFailed("Missing Authorization header")
        jwt_token = UofT_JWTAuthentication.get_the_token_from_header(jwt_token)  # clean the token
        # Decode the JWT and verify its signature
        try:
            payload = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=['HS256'])
        except:
            raise AuthenticationFailed('Invalid JWT')
        return self.authenticate_credentials(payload)
        

    def authenticate_credentials(self, payload):

        email = payload.get('email')
        
        # Essentials check
        if email is None:
            raise AuthenticationFailed('User identifier not found in JWT')
        user = UofTUser.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        
        # Expiration check
        expiration_timestamp = payload.get('expiration') or payload.get('exp')
        if expiration_timestamp is None:
            raise AuthenticationFailed('Expiration timestamp not found in JWT')
        expiration_datetime = datetime.fromtimestamp(expiration_timestamp)
        if datetime.now() > expiration_datetime:
            raise AuthenticationFailed('JWT expired')
        return user, payload


    @classmethod
    def create_jwt(cls, user):
        
        expiry_interval = settings.JWT_CONF['TOKEN_LIFETIME_HOURS']
        
        # Create the JWT payload
        payload = {
            
            # Essential fields
            'name': user.get_full_name(),
            'email': user.email,
                        
            # Meta fields
            'expiration': int((datetime.now() + timedelta(hours=expiry_interval)).timestamp()),
        }

        # Encode the JWT with your secret key
        jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return jwt_token

    @classmethod
    def get_the_token_from_header(cls, token):
        token = token.replace('Bearer', '').replace(' ', '')  # clean the token
        return token