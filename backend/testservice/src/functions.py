from typing import List

from bson import ObjectId
from fastapi import FastAPI, Response, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient

from collections import defaultdict

from .models import Test, Question, UserAnswer
from datetime import datetime


def check_answers(test: Test):
    users = test.users
    questions = test.questions

    for user in users:
        for question in questions:
            score = 0

            if question.question_type == 'closed':
                points_for_answer = question.max_score / \
                    len(filter(lambda a: a.is_correct, question.answers))

                for answer in question.answers:
                    if user in answer.users_voted and answer.is_correct:
                        score += points_for_answer

                    elif user in answer.users_voted and not answer.is_correct:
                        score -= points_for_answer

            score = 0 if score <= 0 else score
            question.user_answers.append(UserAnswer(user=user, score=score))

    test.users = users
    test.questions = questions
    return test
