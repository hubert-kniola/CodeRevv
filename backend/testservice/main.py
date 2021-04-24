import uvicorn

from typing import List
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient

import models

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


@app.post('/test/create', response_model=models.Test, status_code=201)
async def create_test(test: models.Test):
    new_test = await engine.save(test)
    created_test = await engine.find_one(models.Test, models.Test.id == new_test.id)

    return jsonable_encoder(created_test)


@app.get('/test/list', response_model=List[models.Test])
async def tests_list():
    tests = await engine.find(models.Test)

    return jsonable_encoder(tests)


@app.delete('/test/delete', status_code=204)
async def delete_test(test: models.Test):
    await engine.delete(test)


@app.post('/test/user/add', status_code=200)
async def add_user(test_name, user_id):
    test = await engine.find_one(models.Test, models.Test.name == test_name)
    test.users.append(int(user_id))
    await engine.save(test)


@app.delete('/test/user/delete', status_code=204)
async def delete_user(test_name, user_id):
    test = await engine.find_one(models.Test, models.Test.name == test_name)
    test.users.remove(int(user_id))
    await engine.save(test)


@app.post('/test/question/add', status_code=200)
async def add_question(test_name, question: models.Question):
    test = await engine.find_one(models.Test, models.Test.name == test_name)
    test.question.append(question)
    await engine.save(test)


@app.delete('/test/question/delete', status_code=200)
async def delete_question(test_name, question_id):
    test = await engine.find_one(models.Test, models.Test.name == test_name)
    test.question.pop(int(question_id))
    await engine.save(test)


@app.patch('/test/question/modify', status_code=200)
async def modify_question(test_name, question_id, question: models.Question):
    test = await engine.find_one(models.Test, models.Test.name == test_name)
    test.question[int(question_id)] = question
    await engine.save(test)


@app.post('/test/answer/add', status_code=201)
async def add_answer(test_name, answer: models.Answer):
    test = await engine.find_one(models.Test, models.Test.name == test_name)
    test.user_answers.append(answer)
    await engine.save(test)


@app.delete('/test/answer/delete', status_code=204)
async def delete_question(test_name, answer_id):
    test = await engine.find_one(models.Test, models.Test.name == test_name)
    test.user_answers.pop(int(answer_id))
    await engine.save(test)


@app.patch('/test/answer/modify', status_code=200)
async def modify_question(test_name, answer_id, answer: models.Answer):
    test = await engine.find_one(models.Test, models.Test.name == test_name)
    test.user_answers[int(answer_id)] = answer
    await engine.save(test)


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8080, reload=True, debug=True)
