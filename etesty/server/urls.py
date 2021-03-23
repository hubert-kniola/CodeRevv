from django.urls import path
from .views import user_list, user_detail, ReactView, test_list
from django.conf.urls import url

urlpatterns = [
    path('api/v1/users/', user_list),
    path('api/v1/user/<int:pk>/', user_detail),
    path('api/v1/tests/', test_list),
    url(r'^', ReactView.as_view()),
]
