from django.urls import path
from .views import *

urlpatterns = [
    path('api/v1/r/python/', run_python, name='run_python'),
]
