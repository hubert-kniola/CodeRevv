from fastapi import FastAPI
from fastapi.testclient import TestClient

import pytest

from ..main import app

client = TestClient(app)

test_data = {
    "name": "string",
    "pub_test": "string",
    "creator": 0,
    "users": [
        0
    ],
    "question": [
        {
            "question_type": "string",
            "content": "string",
            "answer": "string",
            "max_score": 0
        }
    ],
    "user_answers": [
        {
            "question": 1,
            "answer": "string",
            "user": 2,
            "comment": "string",
            "score": 2
        }
    ],
    "id": "5f85f36d6dfecacc68428a46"
}

user_data = {"testname": "testname",
             "user_id": 1}

question_data = {
    "question_type": "otwarte",
    "content": "string",
    "answer": "string",
    "max_score": 2
}

answer_data = {
    "question": 1,
    "answer": "string",
    "user": 1,
    "comment": "string",
    "score": 2
}


def test_create_test():
    response = client.post('/test/create', json=test_data)
    assert response.status_code == 201
    assert response.json() == test_data


def test_lists_test():
    response = client.get('/test/list')
    assert response.status_code == 201
    assert response.json() == test_data


def test_delete_test():
    response = client.delete('/test/delete', json=test_data)
    assert response.status_code == 204
    assert response.json() == {'message': 'test deleted'}


def test_add_user():
    response = client.post('/test/user/add', json=user_data)
    assert response.status_code == 200
    assert response.json() == {'message': 'user added'}


def test_delete_user():
    response = client.delete('/test/user/delete', json=user_data)
    assert response.status_code == 204
    assert response.json() == {'message': 'user deleted'}


def test_add_question():
    response = client.post('/test/question/add', json=question_data)
    assert response.status_code == 200
    assert response.json() == {'message': 'question added'}


def test_modify_question():
    response = client.patch('/test/question/modify', json=question_data)
    assert response.status_code == 200
    assert response.json() == {'message': 'question modified'}


def test_delete_question():
    response = client.delete('/test/question/delete', json=question_data)
    assert response.status_code == 204
    assert response.json() == {'message': 'question deleted'}


def test_add_answer():
    response = client.post('/test/answer/add', json=answer_data)
    assert response.status_code == 201
    assert response.json() == {'message': 'answer added'}


def test_modify_answer():
    response = client.patch('/test/answer/modify', json=answer_data)
    assert response.status_code == 200
    assert response.json() == {'message': 'answer modified'}


def test_delete_answer():
    response = client.delete('/test/answer/delete', json=answer_data)
    assert response.status_code == 204
    assert response.json() == {'message': 'answer deleted'}
