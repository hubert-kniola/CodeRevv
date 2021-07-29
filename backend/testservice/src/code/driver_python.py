from random import choices, sample, randint, random, uniform
from requests import Response
from ..models import Test, UserAnswer
from re import findall
import requests
from time import sleep
from typing import Callable, Dict
from ..configure import judgeproxy


def force_await_response(callable: Callable[[], None], predicate: Callable[[Dict[str, str]], bool], interval=0.5,
                         retries=120) -> Response:
    response = callable()

    while not predicate(response.json()):
        response = callable()
        sleep(interval)

        retries -= 1
        if retries < 0:
            raise TimeoutError('execution took too long')

    return response


def run_code(frame: str):
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
    return result


def validate_codes(case_amount: int, c_code: str, case_code: str, u_code: str):
    creator_fname = findall(r'def\s([a-zA-Z]*_*[a-zA-Z])', c_code)
    user_fname = findall(r'def\s([a-zA-Z]*_*[a-zA-Z])', u_code)
    case_fname = findall(r'def\s([a-zA-Z]*_*[a-zA-Z])', case_code)
    frame = '''from random import choices, sample, randint, random, uniform
import string
import sys, os    

''' + str(case_code) + '''

''' + str(u_code) + '''

''' + str(c_code) + '''

is_correct = True
for i in range(''' + str(case_amount) + '''):
    sys.stdout = open(os.devnull, 'w')
    case = ''' + str(case_fname[0]) + '''()
    creator_result = ''' + str(creator_fname[0]) + '''(case)
    user_result = ''' + str(user_fname[0]) + '''(case)
    sys.stdout = sys.__stdout__
    if creator_result == user_result:
        print(i,case,creator_result,user_result,'True')
    else:
        is_correct = False
        print(i,case,creator_result,user_result,'False')
print(is_correct)
    '''
    total_result = run_code(str(frame))

    return total_result
