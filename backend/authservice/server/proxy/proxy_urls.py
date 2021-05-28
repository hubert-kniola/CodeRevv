from django.urls import path
from .proxy_views import *

urlpatterns = [
    path('api/v1/test/join/<str:test_id>', test, name='test'),
    path('api/v1/test/results/<str:test_id>', test_results, name='test_results'),
    path('api/v1/test/create', test_create, name='test_create'),
    path('api/v1/test/list', test_list, name='test_list'),
    path('api/v1/test/delete', test_delete, name='test_delete'),
    path('api/v1/test/user', test_user, name='test_user'),
    path('api/v1/test/question', test_question, name='test_question'),
    path('api/v1/test/link', test_link_generate, name='test_link_generate'),
    path('api/v1/test/save', test_save, name='test_save'),
    path('api/v1/test/submit', test_submit, name='test_submit'),
]
