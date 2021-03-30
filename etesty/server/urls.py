from django.urls import path, include
from .views import *
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/v1/users/', user_list),
    path('api/v1/user/<int:pk>/', user_detail),
    path('api/v1/tests/', test_list),
    path('api/v1/login/', user_login),
    path('api/v1/register/', user_register),
    path('api/v1/token/obtain/', TokenPairView.as_view(), name='token_create'),
    path('api/v1/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
