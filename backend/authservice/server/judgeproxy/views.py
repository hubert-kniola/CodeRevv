import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

from pprint import pprint

from ..models import AuthUser
from ..utility import get_user_id, make_response_with_cookies, session_authentication

proxy = r'http://127.0.0.1:8080'

@api_view(['POST'])
@session_authentication
def run_python(request):
    response = requests.post(f"{proxy}/test/link?test_id={str(request.data['test_id'])}&user_id={str(get_user_id(request))}")
    return make_response_with_cookies(request, response, response.status_code)

