from django.conf.urls import url
from .views import ReactView

urlpatterns = [
    url(r'^', ReactView.as_view()),
]
