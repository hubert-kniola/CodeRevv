import uvicorn

from typing import List

from bson import ObjectId
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient

from .models import Test, Question, UserAnswer
from datetime import datetime

MONGODB_URL = 'mongodb+srv://admin:admin@cluster0.k1eh0.mongodb.net/testdb?retryWrites=true&w=majority'

app = FastAPI()
client = AsyncIOMotorClient(MONGODB_URL)
engine = AIOEngine(motor_client=client, database='testdb')

prefix = r'http://127.0.0.1:8000/api/v1'

@app.on_event("shutdown")
def shutdown_event():
    client.close()


# tworzenie testu - do zmiany
# usuwanie testu - done
# dodawanie uzytkownika do testu - done
# usuwanie uzytkownika z testu - done
# dodawanie pytania - done
# usuwanie pytania - done
# modyfikacja pytania - done
# dodawanie odpowiedzi - done
# usuwanie odpowiedzi - done
# modyfikacja odpowiedzi - done


@app.post('/test/link', status_code=200)
async def generate_test_link(test_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.is_link_generated = True
    await engine.save(test)
    return {'link': f'{prefix}/test/{test_id}'}


@app.post('/test/{test_id}/{user_id}', status_code=200)
async def join_test(test_id, user_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.users.append(int(user_id))
    return {'name': test.name, 'creator': test.creator, 'questions': test.questions}


@app.post('/test/create', response_model=Test, status_code=201)
async def create_test(test: Test):
    test.pub_test = str(datetime.now())
    new_test = await engine.save(test)
    created_test = await engine.find_one(Test, Test.id == new_test.id)
    return jsonable_encoder(created_test)


@app.get('/test/list', response_model=List[Test], status_code=200)
async def tests_list():
    tests = await engine.find(Test)
    return jsonable_encoder(tests)


@app.delete('/test/delete', status_code=204)
async def delete_test(test_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    await engine.delete(test)
    return {'message': 'test deleted'}


@app.post('/test/user', status_code=200)
async def add_user(data: dict):
    test = await engine.find_one(Test, Test.id == ObjectId(data['test_id']))
    test.users.append(int(data['user_id']))
    await engine.save(test)
    return {'message': 'user added'}


@app.delete('/test/user', status_code=204)
async def delete_user(test_id, user_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.users.remove(int(user_id))
    await engine.save(test)
    return {'message': 'user deleted'}


@app.post('/test/question', status_code=200)
async def add_question(test_id, question: Question):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.question.append(question)
    await engine.save(test)
    return {'message': 'question added'}


@app.delete('/test/question', status_code=204)
async def delete_question(test_id, question_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.question.pop(int(question_id))
    await engine.save(test)
    return {'message': 'question deleted'}


@app.patch('/test/question', status_code=200)
async def modify_question(test_id, question_id, question: Question):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.question[int(question_id)] = question
    await engine.save(test)
    return {'message': 'question modified'}


@app.post('/test/answer', status_code=201)
async def add_answer(test_id, user_answer: UserAnswer):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.user_answers.append(user_answer)
    await engine.save(test)
    return {'message': 'answer added'}


@app.delete('/test/answer', status_code=204)
async def delete_answer(test_id, answer_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.user_answers.pop(int(answer_id))
    await engine.save(test)
    return {'message': 'answer deleted'}


@app.patch('/test/answer', status_code=200)
async def modify_answer(test_id, answer_id, user_answer: UserAnswer):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.user_answers[int(answer_id)] = user_answer
    await engine.save(test)
    return {'message': 'answer modified'}




if __name__ == '__main__':
    uvicorn.run('src.main:app', host='0.0.0.0', port=8080, reload=True, debug=True)
