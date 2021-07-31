import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..configure import testservice

from time import sleep
from typing import Callable, Dict
from re import findall

from ..utility import make_response_with_cookies, session_authentication


@api_view(['POST'])
@session_authentication
def run_python(request):
    response = requests.get(f"{testservice}/r/python", json=request.data)
    return make_response_with_cookies(request, response, response.status_code)
