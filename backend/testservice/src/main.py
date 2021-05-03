import uvicorn

from typing import List

from bson import ObjectId
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient

from .models import Test, Question, Answer 

MONGODB_URL = 'mongodb+srv://admin:admin@cluster0.k1eh0.mongodb.net/testdb?retryWrites=true&w=majority'

app = FastAPI()
client = AsyncIOMotorClient(MONGODB_URL)
engine = AIOEngine(motor_client=client, database='testdb')


@app.on_event("shutdown")
def shutdown_event():
    client.close()


# tworzenie testu - do zmiany
# usuwanie testu - done
# dodawanie uzytkownika do testu - done (zmienic nazwe na id)
# usuwanie uzytkownika z testu - done (zmienic nazwe na id)
# dodawanie pytania - done (zmienic nazwe na id)
# usuwanie pytania - done (zmienic nazwe na id)
# modyfikacja pytania - done (zmienic nazwe na id)
# dodawanie odpowiedzi - done (zmienic nazwe na id)
# usuwanie odpowiedzi - done (zmienic nazwe na id)
# modyfikacja odpowiedzi - done (zmienic nazwe na id)


@app.post('/test/create', response_model=Test, status_code=201)
async def create_test(test: Test):
    new_test = await engine.save(test)
    created_test = await engine.find_one(Test, Test.id == new_test.id)
    return jsonable_encoder(created_test)


@app.get('/test/list', response_model=List[Test], status_code=201)
async def tests_list():
    tests = await engine.find(Test)
    return jsonable_encoder(tests)


@app.delete('/test/delete', status_code=204)
async def delete_test(test_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    await engine.delete(test)
    return {'message': 'test deleted'}


@app.post('/test/user', status_code=200)
async def add_user(test_id, user_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.users.append(int(user_id))
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
async def add_answer(test_id, answer: Answer):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.user_answers.append(answer)
    await engine.save(test)
    return {'message': 'answer added'}


@app.delete('/test/answer', status_code=204)
async def delete_answer(test_id, answer_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.user_answers.pop(int(answer_id))
    await engine.save(test)
    return {'message': 'answer deleted'}


@app.patch('/test/answer', status_code=200)
async def modify_answer(test_id, answer_id, answer: Answer):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.user_answers[int(answer_id)] = answer
    await engine.save(test)
    return {'message': 'answer modified'}


if __name__ == '__main__':
    uvicorn.run('src.main:app', host='0.0.0.0', port=8080, reload=True, debug=True)
