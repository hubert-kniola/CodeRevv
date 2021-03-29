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

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)
        refresh['email'] = self.user.email

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data

