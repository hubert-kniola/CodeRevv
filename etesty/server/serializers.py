from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import datetime
from django.utils import timezone
import random
from django.contrib.auth.hashers import make_password
import random


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, data):
        instance = self.Meta.model()
        instance.set_password(data['password'])
        instance.last_login = timezone.now()
        instance.first_name = data['first_name']
        instance.last_name = data['last_name']
        instance.username = data['first_name'] + data['last_name'] + f'{random.randint(0, 1000)}'
        instance.email = data['email']
        instance.role = 'user'
        instance.is_active = False
        instance.date_joined = timezone.now()

        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = '__all__'


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['email', 'first_name', 'last_name', 'is_staff']


class UserResetEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['email']


class UserResetPasswordSerializer(serializers.ModelSerializer):
    oldpassword = models.CharField(max_length=50)
    newpassword = models.CharField(max_length=50)


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['email', 'password']


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineTest
        fields = '__all__'


class TokenPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)
        refresh['email'] = self.user.email

        data['exp'] = refresh['exp']
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data

