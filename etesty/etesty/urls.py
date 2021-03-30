"""etesty URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('9odgDCK35Iur8YDs3wBj/', admin.site.urls),
    path('', include('server.urls')),
]
