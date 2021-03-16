from django.shortcuts import render

# Create your views here.
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os


class ReactView(View):
    REACT_INDEX = os.path.join(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'webapp'), 'build', 'index.html')

    def get(self, request):
        try:
            with open(ReactView.REACT_INDEX) as file:
                return HttpResponse(file.read())

        except:
            return HttpResponse(
                """
                index.html not found ! build your React app !!
                """,
                status=501,
            )
