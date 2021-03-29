from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = '__all__'


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['email', 'password']


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineTest
        fields = '__all__'


class TokenPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(TokenPairSerializer, cls).get_token(user)

        # Add custom claims
        token['email'] = user.email
        print(token['access'])
        return token

