from typing import List

from bson import ObjectId
from fastapi import FastAPI, Response, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient

from .models import Test, Question, UserAnswer
from datetime import datetime


def check_answers(test: Test):
    users = test.users
    questions = test.questions
    for user in users:
        for question in questions:
            if question.question_type is 'closed':
                if question.user_answers:
                    for user_answer in question.user_answers:
                        if user_answer.content:
                            return 'dupa'
                        else:
                            user_answer.score = 0
                else:
                    return 'no user replied'


