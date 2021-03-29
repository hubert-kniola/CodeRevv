from django.urls import path, include
from .views import *
from django.conf.urls import url

urlpatterns = [
    path('api/v1/users/', user_list),
    path('api/v1/user/<int:pk>/', user_detail),
    path('api/v1/tests/', test_list),
    path('login/', user_login),
    #url(r'^', ReactView.as_view()),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]
