from django.urls import path, include
from .views import *
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/v1/users/', user_list),
    path('api/v1/user/<int:pk>/', user_detail),
    path('api/v1/tests/', test_list),
    path('login/', user_login),
    path('register/', user_register),
    #url(r'^', ReactView.as_view()),
    path('token/obtain/', TokenPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
