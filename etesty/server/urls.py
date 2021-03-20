from django.urls import path
from .views import user_list, user_detail, ReactView
from django.conf.urls import url

urlpatterns = [
    path('api/v1/users/', user_list),
    path('api/v1/user/<int:pk>/', user_detail),
    url(r'^', ReactView.as_view()),
]
