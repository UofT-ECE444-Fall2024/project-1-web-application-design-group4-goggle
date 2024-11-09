from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.password_validation import validate_password
from .models import UofTUser
from .utils import CHECK_PASSWORD, GEN_SECRET

class UofTUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UofTUser
        fields = ['first_name', 'last_name', 'email', 'user_name', 'phone_number']

    def create(self, validated_data):
        instance = UofTUser.objects.create(**validated_data)
        instance.save()
        return instance
    
    def update(self, instance, validated_data):
        validated_data.pop("email")
        for k,v in validated_data.items():
            setattr(instance, k, v)
        instance.save()
        return instance
        

class UofTUserFeaturesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UofTUser
        fields = ['first_name', 'last_name', 'email', 'user_name', 'phone_number']
        

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    password_confirmation = serializers.CharField(style={"input_type": "password"}, write_only=True)
    
    class Meta:
        model = UofTUser
        fields = ['first_name', 'last_name', 'email', 'user_name', 'phone_number', 'password', 'password_confirmation']
        extra_kwargs = {
            'password': {'write_only': True},
            'password_confirmation': {'write_only': True}
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirmation']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if not CHECK_PASSWORD(attrs['password']):
            raise serializers.ValidationError({"password": "Invalid password."})
        validate_password(attrs['password'])
        if not attrs['email'].endswith('@mail.utoronto.ca'):
            raise serializers.ValidationError({"email": "Not a valid UofT email"})
        
        return attrs

    def create(self, validated_data):            
        password = validated_data.pop("password")
        validated_data.pop("password_confirmation")
        user = UofTUser.objects.create(**validated_data)
        user.set_reset_code(GEN_SECRET())
        user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

class UofTUserResetCodeSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    reset_code = serializers.CharField(style={"input_type": "password"}, write_only=True) 

class PasswordResetSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    new_password_confirmation = serializers.CharField(style={"input_type": "password"}, write_only=True)
    
    class Meta:
        model = UofTUser
        fields = ['reset_code', 'new_password', 'new_password_confirmation']
        extra_kwargs = {
            'new_password': {'write_only': True},
            'new_password_confirmation': {'write_only': True}
        }

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirmation']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if not CHECK_PASSWORD(attrs['new_password']):
            raise serializers.ValidationError({"password": "Invalid password."})
        validate_password(attrs['new_password'])
        return attrs
    
    def update(self, instance, validated_data):
        if instance.password == "":
            raise serializers.ValidationError("User is not eligable for a password change, as they already have not signed on before")
        if instance.reset_code != validated_data['reset_code']:
            raise PermissionDenied("Invalid reset code")
        if instance.check_password(validated_data['new_password']):
            raise serializers.ValidationError("The new password cannot be the same as the old password")
        instance.set_reset_code(GEN_SECRET())
        instance.update_last_reset()
        instance.set_password(validated_data["new_password"])
        instance.save()

        return instance

class ChangePasswordSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    new_password_confirmation = serializers.CharField(style={"input_type": "password"}, write_only=True)
    
    class Meta:
        model = UofTUser
        fields = ['email', 'new_password', 'new_password_confirmation']
        extra_kwargs = {
            'new_password': {'write_only': True},
            'new_password_confirmation': {'write_only': True}
        }

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirmation']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if not CHECK_PASSWORD(attrs['new_password']):
            raise serializers.ValidationError({"password": "Invalid password."})
        validate_password(attrs['new_password'])
        return attrs
    
    def update(self, instance, validated_data):
        new_password = validated_data.pop("new_password")
        validated_data.pop("new_password_confirmation")
        instance.set_reset_code(GEN_SECRET())
        instance.update_last_reset()
        instance.set_password(new_password)
        instance.save()
        return instance

class AuthorizationUrlSerializer(serializers.Serializer):
    tenant_id = serializers.CharField()
    client_id = serializers.CharField()
    redirect_uri = serializers.URLField()

class SignOnSerializer(serializers.ModelSerializer):
    class Meta:
        model = UofTUser
        fields = ['user_name', 'phone_number']