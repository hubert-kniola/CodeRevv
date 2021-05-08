import jwt
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
from .serializers import *
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, logout
from django.utils import timezone
from django.utils.encoding import force_bytes
from django.conf import settings
from rest_framework_simplejwt.exceptions import TokenError
import requests


def check_token(request):
    try:
        token1 = request.COOKIES['access']
        payload = jwt.decode(token1, settings.SECRET_KEY,
                         settings.SIMPLE_JWT['ALGORITHM'])
        user = AuthUser.objects.get(pk=payload['user_id'])
    except UserWarning:
        raise AuthenticationFailed
    if payload['email'] == user.email:
        return True
    return False


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
    return Response({'success': verify.get('success', False),
                     'message': verify.get('error-codes', None)})


@api_view(['GET', 'POST'])
def refresh_token(request):
    serializer = RefreshTokenSerializer()
    try:
        attr = {
            'refresh': request.data['refresh']
        }
        token = serializer.validate(attr)
    except(ValueError, TokenError):
        return Response({'success': False}, status=status.HTTP_401_UNAUTHORIZED)
    response = Response({'success': True}, status=status.HTTP_200_OK)
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
            if user.role != 'google_user':
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
                        'success': True,
                        'state': {
                            'expiresAt': exp,
                            'userInfo': {
                                "name": user.first_name,
                                "surname": user.last_name,
                                "role": user.role,
                            }
                        }
                    }
                    response = Response(ret, status=status.HTTP_200_OK)
                    response.set_cookie('access', tokens['access'], httponly=True)
                    response.set_cookie(
                        'refresh', tokens['refresh'], httponly=True)
                    return response
                if (datetime.now() - user.date_joined).total_seconds() > 86400:
                    user.delete()
                    return Response({'success': True}, status=status.HTTP_205_RESET_CONTENT)
                return Response({'success': False}, status=status.HTTP_403_FORBIDDEN)
            return Response({'success': False}, status=status.HTTP_403_FORBIDDEN)
        return Response({'success': False}, status=status.HTTP_404_NOT_FOUND)
    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def user_google_login(request):
    google_data = request.data
    user = authenticate(
        username=google_data['email'], password=google_data['googleId'])
    if not user:
        user_data = {'email': google_data['email'], 'first_name': google_data['givenName'], 'last_name': google_data['familyName'], 'password': google_data['googleId']}
        serializer = UserGoogleRegisterSerializer(data=user_data)
        if serializer.is_valid():
            serializer.is_active = True
            user = serializer.save()
        else:
            return Response({'success': False}, status=status.HTTP_409_CONFLICT)
    user.last_login = timezone.now()
    user.save()

    serializer = TokenPairSerializer()
    attr = {
        'email': user.email,
        'password': google_data['googleId']
    }

    tokens = serializer.validate(attr)
    exp = tokens.pop('exp')

    ret = {
        'success': True,
        'state': {
            'expiresAt': exp,
            'userInfo': {
                "name": user.first_name,
                "surname": user.last_name,
                "role": user.role,
            }
        }
    }
    response = Response(ret, status=status.HTTP_200_OK)
    response.set_cookie('access', tokens['access'], httponly=True)
    response.set_cookie(
        'refresh', tokens['refresh'], httponly=True)
    return response


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def user_register(request):
    if request.method == 'POST':
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.username = user.username + f'{user.id}'
            user.save()
            if user:
                # current_site = get_current_site(request) # PO UZYSKANIU DOMENY
                message = render_to_string('acc_active_email.html', {
                    'user': user,
                    'domain': 'http://127.0.0.1:3000',  # ZMIENIC
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': default_token_generator.make_token(user),
                })
                email = EmailMessage(
                    '[CodeRevv] Aktywacja konta', message, to=[user.email])
                email.content_subtype = 'html'
                email.send()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'success': False}, status=status.HTTP_409_CONFLICT)
        return Response({'success': False}, status=status.HTTP_409_CONFLICT)
    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def activate(request):
    if request.method == 'POST':
        data = request.data
        try:
            uid = urlsafe_base64_decode(data['uid']).decode()
            user = AuthUser.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, UserWarning):
            user = None
        if user is not None and default_token_generator.check_token(user, data['token']):
            if (datetime.now() - user.date_joined).total_seconds() > 86400:
                user.delete()
                return Response({'success': True}, status=status.HTTP_205_RESET_CONTENT)
            user.is_active = True
            user.save()
            return Response({'success': True}, status=status.HTTP_200_OK)
        return Response({'success': False}, status=status.HTTP_409_CONFLICT)
    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([])
@authentication_classes([])
def password_reset(request):
    if request.method == 'POST':
        try:
            user = AuthUser.objects.get(email=request.data['email'])
            if user.role == 'google_user':
                return Response({'success': False}, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({'success': False}, status=status.HTTP_409_CONFLICT)
            
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
            email = EmailMessage('[CodeRevv] Reset hasła',
                                 message, to=[user_email])
            email.content_subtype = 'html'
            email.send()
            return Response({'success': True}, status=status.HTTP_200_OK)
        return Response({'success': False}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


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
        return Response({'success': True}, status=status.HTTP_200_OK)
    return Response({'success': False}, status=status.HTTP_409_CONFLICT)


@api_view(['POST'])
def user_logout(request):
    try:
        logout(request)
    except UserWarning:
        return Response({'success': False}, status=status.HTTP_403_FORBIDDEN)
    response = Response(status=status.HTTP_200_OK)
    response.delete_cookie('access')
    response.delete_cookie('refresh')
    return response