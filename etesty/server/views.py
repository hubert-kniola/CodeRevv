from datetime import timedelta
from django import http

from django.contrib.auth.backends import AllowAllUsersModelBackend
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.http import *
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.decorators.csrf import csrf_exempt

from .serializers import *
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate, logout
# Create your views here.
from django.utils import timezone
import jwt
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.conf import settings
import requests


def check_token(request):
    token1 = request.COOKIES['access']
    payload = jwt.decode(token1, settings.SECRET_KEY, settings.SIMPLE_JWT['ALGORITHM'])
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
    return Response('Invalid token', status=status.HTTP_404_NOT_FOUND)


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
            return Response('User deleted', status=status.HTTP_204_NO_CONTENT)
    return Response('Invalid token', status=status.HTTP_404_NOT_FOUND)


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
    return Response('Invalid token', status=status.HTTP_404_NOT_FOUND)


class TokenPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = TokenPairSerializer


@api_view(['GET', 'POST'])
def refresh_token(request):
    serializer = RefreshTokenSerializer()
    attr = {
        'refresh': request.data['refresh']
    }
    token = serializer.validate(attr)

    response = Response(status=status.HTTP_200_OK)
    response.set_cookie('access', token['access'], httponly=True)
    return response


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def user_login(request):
    if request.method == 'POST':
        user_data = request.data

        user = authenticate(
            username=user_data['email'], password=user_data['password'])

        if user is not None:
            if user.is_active:
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
            return Response('User is not active', status=status.HTTP_403_FORBIDDEN)
        return Response('User does not exist', status=status.HTTP_404_NOT_FOUND)
    return Response('Invalid request', status=status.HTTP_400_BAD_REQUEST)


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
                # current_site = get_current_site(request) # PO UZYSKANIU DOMENY
                message = render_to_string('acc_active_email.html', {
                    'user': user,
                    'domain': 'http://127.0.0.1:3000',  # ZMIENIC
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': default_token_generator.make_token(user),
                })
                email = EmailMessage(
                    '[CodeRevv] Aktywacja konta', message, to=[user_email])
                email.content_subtype = 'html'
                email.send()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response('Invalid request', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def activate(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        try:
            uid = urlsafe_base64_decode(data['uid']).decode()
            user = AuthUser.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, UserWarning):
            user = None
        if user is not None and default_token_generator.check_token(user, data['token']):
            user.is_active = True
            user.save()
            return Response('User activated', status=status.HTTP_200_OK)
        return Response('Activation link is invalid!', status=status.HTTP_409_CONFLICT)


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def password_reset(request):
    if request.method == 'POST':
        user = AuthUser.objects.get(email=request.data['email'])
        user_email = user.email
        user_active = user.is_active
        if user_active:
            # current_site = get_current_site(request) # PO UZYSKANIU DOMENY
            message = render_to_string('pwd_reset_email.html', {
                'user': user,
                'domain': 'http://127.0.0.1:3000',  # ZMIENIC / STRZELAMY DO APKI WEBOWEJ
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })
            email = EmailMessage('[CodeRevv] Reset hasła', message, to=[user_email])
            email.content_subtype = 'html'
            email.send()
            return Response('User Authenticated', status=status.HTTP_200_OK)
        return Response('User is not active. Password recovery unavailable', status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@csrf_exempt
def recover_password(request):
    data = request.data
    try:
        uid = urlsafe_base64_decode(data['uid']).decode()
        user = AuthUser.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, UserWarning):
        user = None
    if user is not None and default_token_generator.check_token(user, data['token']):
        user.set_password(data['password'])
        user.save()
        return Response('Successful recovery. Now you can login to account.')
    else:
        return Response('Recovery link is invalid!')


@api_view(['POST'])
def user_logout(request):
    logout(request)
    response = Response(status=status.HTTP_200_OK)
    response.delete_cookie('access')
    response.delete_cookie('refresh')
    return response


@api_view(['POST'])
def recaptcha_verify(request):
    captcha = request.data.get('token')
    url = 'https://www.google.com/recaptcha/api/siteverify'
    params = {
        'secret': settings.RECAPTCHA_PRIVATE_KEY,
        'response': captcha
    }
    verify = requests.post(url, params=params, verify=True)
    verify = verify.json()
    return Response({'status': verify.get('success', False),
                     'message': verify.get('error-codes', None)})
