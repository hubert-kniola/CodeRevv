import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

from pprint import pprint
from time import sleep

from ..models import AuthUser
from ..utility import get_user_id, make_response_with_cookies, session_authentication

proxy = r'http://3.18.215.227:2358'


def force_await_response(callable, pred, interval=0.5, retries=120):
    response = callable()

    while not pred(response.json()):
        response = callable()
        sleep(interval)

        retries -= 1
        if retries < 0:
            raise TimeoutError('execution took too long')

    return response


@api_view(['POST'])
@session_authentication
def run_python(request):
    payload = {
        'source_code': request.data['code'],
        'language_id': 71,
    }

    response = requests.post(f"{proxy}/submissions", json=payload)
    token = response.json()['token']

    response = force_await_response(
        callable=lambda: requests.get(f"{proxy}/submissions/{token}"),
        pred=lambda resp: resp['status']['id'] != 1
    )

    pprint(response.json())

    return make_response_with_cookies(request, response, response.status_code)
