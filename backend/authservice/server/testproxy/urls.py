from django.urls import path
from .views import *

urlpatterns = [
    path('api/v1/t/results/<str:test_id>', test_results, name='test_results'),
    path('api/v1/t/join/<str:test_id>', test_join, name='test_join'),
    path('api/v1/t/create', test_create, name='test_create'),
    path('api/v1/t/edit', test_edit, name='test_edit'),
    path('api/v1/t/whitelist/<str:test_id>', test_whitelist, name='test_whitelist'),
    path('api/v1/t/list/creator', creator_tests, name='creator_tests'),
    path('api/v1/t/delete', test_delete, name='test_delete'),
    path('api/v1/t/questions', test_questions, name='test_questions'),
    path('api/v1/t/link', test_link_generate, name='test_link_generate'),
    path('api/v1/t/submit', test_submit, name='test_submit')
]
