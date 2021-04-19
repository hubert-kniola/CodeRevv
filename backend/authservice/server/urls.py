from django.urls import path, include
from .views.views import *
from .views.authviews import *
from .views.dashboardviews import *

urlpatterns = [
    path('api/v1/users/', user_list),
    path('api/v1/user/<int:pk>/', user_detail),
    path('api/v1/tests/', test_list),
    path('api/v1/login/', user_login),
    path('api/v1/login/google/', user_google_login),
    path('api/v1/register/', user_register),
    path('api/v1/reset/', password_reset),
    path('api/v1/token/obtain/', TokenPairView.as_view(), name='token_create'),
    path('api/v1/token/refresh/', refresh_token, name='token_refresh'),
    path('api/v1/activate/', activate, name='activate'),
    path('api/v1/recover/', recover_password, name='recover'),
    path('api/v1/logout/', user_logout, name='logout'),
    path('api/v1/recaptcha/', recaptcha_verify),
]