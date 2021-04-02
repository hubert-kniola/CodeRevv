from datetime import timedelta
from django import http

from django.contrib.auth.backends import AllowAllUsersModelBackend
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.http import *
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from .serializers import *
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
# Create your views here.
from django.utils import timezone
import jwt
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes


def check_token(request):
    token1 = request.COOKIES['access']
    payload = jwt.decode(token1, '(+!5l=de&_#wtjtg58nt8*r7*z-xh^8ah)*#k!hnm4!rz59y!r', 'HS256')
    try:
        user = AuthUser.objects.get(pk=payload['user_id'])
    except UserWarning:
        raise AuthenticationFailed
    if payload['email'] == user.email:
        return True
    return False


@api_view(['GET', 'POST'])
def user_list(request):
    if check_token(request):
        if request.method == 'GET':
            users = AuthUser.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            serializer = UserSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    if check_token(request):
        try:
            user = AuthUser.objects.get(pk=pk)

        except AuthUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = UserSerializer(user)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def test_list(request):
    if check_token(request):
        if request.method == 'GET':
            tests = OnlineTest.objects.all()
            serializer = TestSerializer(tests, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            serializer = TestSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_404_NOT_FOUND)


class TokenPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = TokenPairSerializer


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def user_login(request):
    if request.method == 'POST':
        user_data = request.data

        user = authenticate(
            username=user_data['email'], password=user_data['password'])

        if user is not None:
            user.is_active = True
            user.last_login = timezone.now()
            user.save()

            serializer = TokenPairSerializer()
            attr = {
                'email': user.email,
                'password': user_data['password']
            }

            tokens = serializer.validate(attr)
            exp = tokens.pop('exp')

            ret = {
                'expiresAt': exp,
                'userInfo': {
                    "name": user.first_name,
                    "surname": user.last_name,
                    "role": user.role,
                }
            }
            response = Response(ret, status=status.HTTP_200_OK)
            response.set_cookie('access', tokens['access'], httponly=True)
            response.set_cookie('refresh', tokens['refresh'], httponly=True)
            return response

        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def user_register(request):
    if request.method == 'POST':
        serializer = UserRegisterSerializer(data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            user = serializer.save()
            user_email = user.email
            if user:
                current_site = get_current_site(request)
                message = render_to_string('acc_active_email.html', {
                    'user': user,
                    'domain': 'http://127.0.0.1:3000', # ZMIENIC
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': default_token_generator.make_token(user),
                })
                email = EmailMessage('Aktywacja maila', message, to=[user_email])
                email.content_subtype = 'html'
                print(email)
                email.send()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = AuthUser.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, UserWarning):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return Response('Thank you for your email confirmation. Now you can login your account.')
    else:
        return Response('Activation link is invalid!')
