import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

from pprint import pprint
from time import sleep
from typing import Callable, Dict

from ..models import AuthUser
from ..utility import get_user_id, make_response_with_cookies, session_authentication

proxy = r'http://3.18.215.227:2358'


def force_await_response(callable: Callable[[], None], predicate: Callable[[Dict[str, str]], bool], interval=0.5, retries=120) -> Response:
    ''' Judge0 wymaga wysłania żądania uruchomienia kodu i dopiero potem pobrania wyniku.
        Pobranie wyniku nie oznacza że dostaniesz output, status może być '1' czyli 'w kolejce'.
        Funkcja zapewnia output, lub wyrzuca wyjątek gdy przekroczony zostanie czas.
        
        Arguments:
            * callable -- funkcja wykonująca żądanie
            * predicate -- funkcja sprawdzająca czy odpowiedź jest ok

        Raises:
            * TimeoutError -- po przekroczeniu danej ilości prób

        Example: 
        ```
        # pobieranie zakończonego przetwarzania kodu z judge0
        response = force_await_response(
            callable=lambda _: requests.get(f"{proxy}/submissions/{token}"),
            predicate=lambda resp: resp['status']['id'] != 1
        )
        ```

    '''
    response = callable()

    while not predicate(response.json()):
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
        callable=lambda _: requests.get(f"{proxy}/submissions/{token}"),
        predicate=lambda resp: resp['status']['id'] != 1
    )

    return make_response_with_cookies(request, response, response.status_code)
