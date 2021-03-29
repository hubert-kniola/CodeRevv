from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import datetime
from django.utils import timezone
from django.contrib.auth.hashers import make_password
import random


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('email', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, data):
        instance = self.Meta.model()
        instance.id = random.randint(1, 10000000)
        instance.set_password(data['password'])
        instance.last_login = timezone.now()
        instance.is_superuser = False
        instance.username = data['username']
        instance.first_name = data['first_name']
        instance.last_name = data['last_name']
        instance.email = data['email']
        instance.is_staff = False
        instance.is_active = True
        instance.date_joined = timezone.now()

        instance.save()
        return instance


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

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data

