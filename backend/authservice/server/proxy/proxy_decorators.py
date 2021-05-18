import jwt
from django.conf import settings
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.core.exceptions import PermissionDenied

from ..views.serializers import AuthUser


def session_authentication(function, login_url=None, redirect_field_name=REDIRECT_FIELD_NAME):
    def wrap(request):
        try:
            token1 = request.COOKIES['access']
            payload = jwt.decode(token1, settings.SECRET_KEY,
                                 settings.SIMPLE_JWT['ALGORITHM'])
            user = AuthUser.objects.get(pk=payload['user_id'])
            if payload['email'] == user.email:
                return function(request)
            raise PermissionDenied
        except:
            raise PermissionDenied
    return wrap
