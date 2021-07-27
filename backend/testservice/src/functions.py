from random import choices, sample, randint, random, uniform

from requests import Response

from .models import Test, UserAnswer
from re import findall
import requests
from time import sleep
from typing import Callable, Dict
import string

proxy = r'http://3.18.215.227:2358'


def force_await_response(callable: Callable[[], None], predicate: Callable[[Dict[str, str]], bool], interval=0.5, retries=120) -> Response:
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

    response = requests.post(f"{proxy}/submissions", json=payload)
    token = response.json()['token']

    response = force_await_response(
        callable=lambda: requests.get(f"{proxy}/submissions/{token}"),
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


def validate_codes(input_type: str, c_code: str, u_code: str):
    creator_fname = findall(r'\s([a-zA-Z]*_*[a-zA-Z])', c_code)
    user_fname = findall(r'\s([a-zA-Z]*_*[a-zA-Z])', u_code)
    matcher = {
        'str': ''.join(choices(
                string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation + string.whitespace,
                k=10)),
        'list': sample(range(0, 100), 10),
        'int': randint(0, 100),
        'float': uniform(0, 100)
    }
    frame = f"""
    from random import choices, sample, randint, random, uniform
    import string
    
    matcher = {
        'str': ''.join(choices(
                string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation + string.whitespace,
                k=10)),
        'list': sample(range(0, 100), 10),
        'int': randint(0, 100),
        'float': uniform(0, 100)
    }
    
    print = lambda args*: pass
    pprint = lambda args*: pass
    
    {u_code}
    
    {c_code}
    
    from random import randint, sample
    is_correct = True
    for i in range(5):
        case = matcher.get({input_type})
        creator_result = {creator_fname}(case)
        user_result = {user_fname}(case)
        if creator_result is user_result:
            print(i,case,creator_result,user_result,'True')
        else
            is_correct = False
            print(i,case,creator_result,user_result,'False')
    print(is_correct)
    """
    total_result = run_code(frame)

    return total_result


def check_answers(test: Test):
    users = test.users
    questions = test.questions

    for user in users:
        for question in questions:
            score = 0

            if question.question_type == 'closed':
                points_for_answer = question.max_score / \
                                    len(list(filter(lambda a: a.is_correct, question.answers)))

                for answer in question.answers:
                    if not answer.users_voted:
                        answer.users_voted = []
                    if user in answer.users_voted and answer.is_correct:
                        score += points_for_answer

                    elif user in answer.users_voted and not answer.is_correct:
                        score -= points_for_answer

            if question.question_type == 'open':
                for user_answer in question.user_answers:
                    question_result = validate_codes(question.creator_code, user_answer.content)
                    find_is_correct = question_result['output'].split(" ")[-1]
                    if find_is_correct is 'True':
                        score = question.max_score
                    else:
                        score = 0


            score = 0 if score <= 0 else score

            ua = UserAnswer(user=user, score=score)

            if not question.user_answers:
                question.user_answers = [ua]
            elif ua not in question.user_answers:
                question.user_answers.append(ua)

    test.users = users
    test.questions = questions
    return test


def get_test_with_user_answers_for_user(test: Test, user_id: int):
    questions = test.questions

    for question in questions:
        question.user_answers = list(filter(
            lambda ua: ua.user == user_id, question.user_answers))

        for ia, answer in enumerate(question.answers):
            question.answers[ia].users_voted = list(
                filter(lambda a: a == user_id, answer.users_voted))

    test.questions = questions
    return test
