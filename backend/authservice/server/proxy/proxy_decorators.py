import jwt
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.shortcuts import render, resolve_url
from urllib.parse import urlparse
from ..views.authviews import check_token
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from ..views.serializers import AuthUser


def session_authentication(function=None, login_url=None, redirect_field_name=REDIRECT_FIELD_NAME):
    def wrap(request):
        if request.COOKIES['access'] is not None:
            token1 = request.COOKIES['access']
            payload = jwt.decode(token1, settings.SECRET_KEY,
                                 settings.SIMPLE_JWT['ALGORITHM'])
            user = AuthUser.objects.get(pk=payload['user_id'])
            if payload['email'] == user.email:
                return True
        return False
    return wrap
