from fastapi.testclient import TestClient
import pytest

from ..models import Test
from ..main import app, engine, client

engine.database_name = 'test_testdb'
engine.database = client[engine.database_name]
client = TestClient(app)

test_data = {
    "name": "string",
    "pub_test": "string",
    "creator": 55,
    "users": [
        0
    ],
    "questions": [
        {
            "index": 0,
            "question_type": "string",
            "content": "string",
            "answers": [
                {
                    "index": 0,
                    "content": "string",
                    "is_correct": True,
                    "users_voted": [
                        0
                    ]
                }
            ],
            "max_score": 0,
            "user_answers": [
                {
                    "content": "string",
                    "user": 0,
                    "comment": "string",
                    "score": 0
                }
            ]
        }
    ],
    "is_link_generated": True,
    "start_time": "string",
    "stop_time": "string",
    "is_visible": True,
    "is_finished": True,
    "max_score": 0,
    "id": "5f85f36d6dfecacc68428a00"
}

id_list = {"users": [2, 3, 4, 5, 6]}

test_id = "5f85f36d6dfecacc68428a00"

prefix = r'http://127.0.0.1:8000/api/v1'

@pytest.mark.asyncio
async def setup_method():
    @pytest.fixture
    async def teardown_method():
        tests = await engine.find(Test)
        print(tests)

        for t in tests:
            await engine.delete(t)


def test_init():
    assert 1 == 1


# test_generate_test_link DONE
# test_join_test DONE
# test_list_test DONE
# test_creator_test DONE
# test_create_test DONE
# test_whitelist_test DONE
# test_delete_test DONE
# test_sumbit_test DONE
# test_result_test DONE


def test_create_test():
    response = client.post(f'/t/create', json=test_data)
    assert response.status_code == 201
    # assert response.json() == test_data


def test_whitelist_test():
    response = client.patch(f'/t/whitelist/{test_id}', json=id_list)
    assert response.status_code == 201
    assert response.json() == {'message': 'whitelist updated'}


def test_generate_test_link():
    response = client.post(f'/t/link/{test_id}/55')
    assert response.status_code == 200
    assert response.json() == {'link': f'{prefix}/t/{test_id}'}


def test_list_test():
    response = client.get(f'/t/list/0')
    assert response.status_code == 200
    # assert response.json() == [test_data]


def test_join_test():
    response = client.post(f'/t/{test_id}/1')
    assert response.status_code == 200


def test_creator_tests():
    response = client.get(f'/t/list/creator/55')
    assert response.status_code == 200
    # assert response.json() == [test_data]


def test_submit_test():
    response = client.post(f'/t/save/{test_id}/0', json=test_data)
    assert response.status_code == 200


def test_result_test():
    response = client.get(f'/t/result/{test_id}/1')
    assert response.status_code == 200


def test_delete_test():
    response = client.delete(f'/t/delete/{test_id}')
    assert response.status_code == 204
    assert response.json() == {'message': 'test deleted'}
