import jwt
from django.conf import settings
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.core.exceptions import PermissionDenied
from jwt import ExpiredSignatureError
from rest_framework.response import Response

from .views.serializers import AuthUser, RefreshTokenSerializer
from rest_framework_simplejwt.exceptions import TokenError

def refresh_token(request):
    serializer = RefreshTokenSerializer()
    try:
        attr = {
            'refresh': request.COOKIES['refresh']
        }
        token = serializer.validate(attr)
        request.COOKIES['access'] = token['access']

    except(ValueError, TokenError):
        raise PermissionDenied


def session_authentication(function, login_url=None, redirect_field_name=REDIRECT_FIELD_NAME):
    def wrap(request, *args, **kwargs):
        try:
            token1 = request.COOKIES['access']
            payload = jwt.decode(token1, settings.SECRET_KEY,
                                 settings.SIMPLE_JWT['ALGORITHM'])
            user = AuthUser.objects.get(pk=payload['user_id'])
            if payload['email'] == user.email:
                return function(request, *args, **kwargs)
        except (ExpiredSignatureError, KeyError):
            refresh_token(request)

            return function(request, *args, **kwargs)

    return wrap


def get_user_id(request):
    token1 = request.COOKIES['access']
    payload = jwt.decode(token1, settings.SECRET_KEY,
                         settings.SIMPLE_JWT['ALGORITHM'])
    return int(payload['user_id'])


def move_cookies(request, response):
    if request.COOKIES['access']:
        response.set_cookie('access', request.COOKIES['access'], max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(), httponly=True)
    if request.COOKIES['refresh']:
        response.set_cookie('refresh', request.COOKIES['refresh'], max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds(), httponly=True)


def make_response_with_cookies(request, *args, **kwargs):
    response = Response(*args, **kwargs)
    move_cookies(request, response)
    return response