from django.conf.urls import url

from .views import ReactAppView

urlpatterns = [
    url(r'^', ReactAppView.as_view()),
]
