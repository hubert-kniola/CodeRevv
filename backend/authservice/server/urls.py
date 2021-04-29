from background_task.models import Task
from django.urls import path, include
from .views.views import *
from .views.authviews import *
from .views.dashboardviews import *
from .background import delete_inactive_users

urlpatterns = [
    path('api/v1/users/', user_list, name='user_list'),
    path('api/v1/user/<int:pk>/', user_detail, name='user'),
    path('api/v1/tests/', test_list, name='test_list'),
    path('api/v1/login/', user_login, name='login'),
    path('api/v1/login/google/', user_google_login, name='google_login'),
    path('api/v1/register/', user_register, name='register'),
    path('api/v1/reset/', password_reset, name='pwd_reset'),
    path('api/v1/token/obtain/', TokenPairView.as_view(), name='token_create'),
    path('api/v1/token/refresh/', refresh_token, name='token_refresh'),
    path('api/v1/activate/', activate, name='activate'),
    path('api/v1/recover/', recover_password, name='recover'),
    path('api/v1/logout/', user_logout, name='logout'),
    path('api/v1/recaptcha/', recaptcha_verify, name='recaptcha'),
]
