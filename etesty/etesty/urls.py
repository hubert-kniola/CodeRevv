"""etesty URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/"""

from django.contrib import admin
from django.urls import path, include
from server.views import GoogleLogin

urlpatterns = [
    path('9odgDCK35Iur8YDs3wBj/', admin.site.urls),
    path('', include('server.urls')),
    #path('', include('allauth.urls')),
    #path('rest-auth/', include('rest_auth.urls')),
    #path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/google/', GoogleLogin.as_view()),
]
