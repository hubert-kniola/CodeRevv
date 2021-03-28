from django.urls import path
from .views import *
from django.conf.urls import url

urlpatterns = [
    path('api/v1/users/', user_list),
    path('api/v1/user/<int:pk>/', user_detail),
    path('api/v1/tests/', test_list),
    path('login/<str:email>&<str:password>/', user_login),
    #url(r'^', ReactView.as_view()),
]
