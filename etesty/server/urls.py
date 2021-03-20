from django.urls import path
from .views import user_list, user_detail

urlpatterns = [
    path('api/v1/users/', user_list),
    path('api/v1/user/<int:pk>/', user_detail)
]