from random import choices, sample, randint, random, uniform

from requests import Response

from .models import Test, UserAnswer
from re import findall
import requests
from time import sleep
from typing import Callable, Dict
from .code.driver_python import validate_codes

proxy = r'http://3.18.215.227:2358'


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

                score = 0 if score <= 0 else score

                ua = UserAnswer(user=user, score=score)

                if not question.user_answers:
                    question.user_answers = [ua]
                elif ua not in question.user_answers:
                    question.user_answers.append(ua)

            if question.question_type == 'open':
                for user_answer in question.user_answers:
                    question_result = validate_codes(question.case_amount, question.creator_code, question.generate_case, user_answer.content)
                    find_is_correct = question_result['output'].split()[-1]
                    user_answer.result_statistics = question_result['output']
                    if find_is_correct == 'True':
                        score = question.max_score
                    else:
                        score = 0
                    user_answer.score = score

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
