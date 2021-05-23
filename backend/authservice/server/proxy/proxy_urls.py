from django.urls import path
from .proxy_views import *

urlpatterns = [
    path('api/v1/test/join/<str:test_id>', test_join, name='test_join'),
    path('api/v1/test/create', test_create, name='test_create'),
    path('api/v1/test/list', test_list, name='test_list'),
    path('api/v1/test/delete', test_delete, name='test_delete'),
    path('api/v1/test/user', test_user, name='test_user'),
    path('api/v1/test/question', test_question, name='test_question'),
    path('api/v1/test/answer', test_answer, name='test_answer'),
    path('api/v1/test/link', test_link_generate, name='test_link_generate'),
]
