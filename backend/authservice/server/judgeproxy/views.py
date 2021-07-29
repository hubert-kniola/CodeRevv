import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..configure import testservice, judgeproxy

from time import sleep
from typing import Callable, Dict
from re import findall

from ..utility import make_response_with_cookies, session_authentication


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


def validate_codes(case_code: str, u_code: str):
    user_fname = findall(r'def\s([a-zA-Z]*_*[a-zA-Z])', u_code)
    case_fname = findall(r'def\s([a-zA-Z]*_*[a-zA-Z])', case_code)
    frame = '''from random import choices, sample, randint, random, uniform
import string
import sys, os    

''' + str(case_code) + '''

''' + str(u_code) + '''

is_correct = True
for i in range(5):
    sys.stdout = open(os.devnull, 'w')
    case = ''' + str(case_fname[0]) + '''()
    user_result = ''' + str(user_fname[0]) + '''(case)
    sys.stdout = sys.__stdout__
    print(i,case,user_result)
    '''

    return frame


@api_view(['POST'])
@session_authentication
def run_python(request):
    response = requests.post(f"{testservice}/r/case_code/{request.data['test_id']}", json=request.data['content'])
    frame = validate_codes(response.json()['case_code'], request.data['code'])

    payload = {
        'source_code': frame,
        'language_id': 71,
    }

    response = requests.post(f"{judgeproxy}/submissions", json=payload)
    token = response.json()['token']

    response = force_await_response(
        callable=lambda: requests.get(f"{judgeproxy}/submissions/{token}"),
        predicate=lambda resp: resp['status']['id'] != 1
    )

    data = response.json()

    result = {
        'success': data['status']['id'] == 3,
        'time': data['time'],
        'status': data['status']['description']
    }

    result['output'] = data['stdout'] if result['success'] else data['stderr']

    return make_response_with_cookies(request, result, response.status_code)
