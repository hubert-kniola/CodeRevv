from fastapi.testclient import TestClient
import pytest

from ..models import Test
from ..main import app, engine, client

engine.database_name = 'test_testdb'
engine.database = client[engine.database_name]
client = TestClient(app)

test_data = [{
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
    "id": "5f85f36d6dfecacc68428a47"
}]

user_data = {"test_id": "5f85f36d6dfecacc68428a47",
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


@pytest.mark.asyncio
async def setup_method():

    @pytest.fixture
    async def teardown_method():
        tests = await engine.find(Test)
        print(tests)

        for t in tests:
            await engine.delete(t)

# WSZYSTKIE DO POPRAWKI

def test_init():
    assert 1 == 1


# def test_lists_test():
#     response = client.get('/test/list')
#     assert response.status_code == 201
#     assert response.json() == test_data


# def test_add_user():
#     response = client.post('/test/user', json=user_data)
#     assert response.status_code == 200
#     assert response.json() == {'message': 'user added'}


# def test_delete_user():
#     response = client.delete('/test/user?test_id=5f85f36d6dfecacc68428a47&user_id=1')
#     assert response.status_code == 204
#     assert response.json() == {'message': 'user deleted'}


# def test_add_question():
#     response = client.post('/test/question?test_id=5f85f36d6dfecacc68428a47', json=question_data)
#     assert response.status_code == 200
#     assert response.json() == {'message': 'question added'}


# def test_modify_question():
#     response = client.patch('/test/question?test_id=5f85f36d6dfecacc68428a47&question_id=1', json=question_data)
#     assert response.status_code == 200
#     assert response.json() == {'message': 'question modified'}


# def test_delete_question():
#     response = client.delete('/test/question?test_id=5f85f36d6dfecacc68428a47&question_id=1')
#     assert response.status_code == 204
#     assert response.json() == {'message': 'question deleted'}


# def test_add_answer():
#     response = client.post('/test/answer?test_id=5f85f36d6dfecacc68428a47', json=answer_data)
#     assert response.status_code == 201
#     assert response.json() == {'message': 'answer added'}


# def test_modify_answer():
#     response = client.patch('/test/answer?test_id=5f85f36d6dfecacc68428a47&answer_id=1', json=answer_data)
#     assert response.status_code == 200
#     assert response.json() == {'message': 'answer modified'}


# def test_delete_answer():
#     response = client.delete('/test/answer?test_id=5f85f36d6dfecacc68428a47&answer_id=1')
#     assert response.status_code == 204
#     assert response.json() == {'message': 'answer deleted'}


# def test_delete_test():
#     response = client.delete('/test/delete?test_id=5f85f36d6dfecacc68428a47')
#     assert response.status_code == 204
#     assert response.json() == {'message': 'test deleted'}
