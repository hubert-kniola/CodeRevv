import uvicorn

from typing import List

from bson import ObjectId
from fastapi import FastAPI, Response, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
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


@app.post('/test/link', status_code=200)
async def generate_test_link(test_id, user_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    if test.creator is int(user_id):
        test.is_link_generated = True
        await engine.save(test)
        return {'link': f'{prefix}/test/{test_id}'}
    else:
        return {'link': 'Request was not send by creator'}


@app.post('/test/{test_id}/{user_id}', status_code=200)
async def test(test_id, user_id):
    user_id = int(user_id)
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    if test.creator == user_id:
        return test
    elif test.is_link_generated:
        if user_id not in test.users:
            test.users.append(user_id)
            await engine.save(test)
        return {'name': test.name, 'creator_id': test.creator, 'questions': test.questions}
    elif not test.is_link_generated:
        if user_id in test.users:
            return {'name': test.name, 'creator_id': test.creator, 'questions': test.questions}
    return JSONResponse(status_code=status.HTTP_403_FORBIDDEN)


@app.post('/test/create', response_model=Test, status_code=201)
async def create_test(test: Test):
    test.pub_test = str(datetime.now())
    new_test = await engine.save(test)
    created_test = await engine.find_one(Test, Test.id == new_test.id)
    return jsonable_encoder(created_test)


@app.get('/test/list', response_model=List[Test], status_code=200)
async def tests_list():
    tests = await engine.find(Test)
    return tests


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
    test.questions.append(question)
    await engine.save(test)
    return {'message': 'question added'}


@app.delete('/test/question', status_code=204)
async def delete_question(test_id, question_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.questions.pop(int(question_id))
    await engine.save(test)
    return {'message': 'question deleted'}


@app.patch('/test/question', status_code=200)
async def modify_question(test_id, question_id, question: Question):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    test.questions[int(question_id)] = question
    await engine.save(test)
    return {'message': 'question modified'}


@app.patch('/test/save', status_code=200)
async def save_test(test_id, question_id, user_answer: UserAnswer):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    answers = test.questions[int(question_id)].user_answers
    is_found = False
    if answers:
        for x, answer in enumerate(answers):
            if user_answer.user is answer.user:
                answers[x] = user_answer
                is_found = True
                break
    else:
        answers = []
    if not is_found:
        answers.append(user_answer)
    test.questions[int(question_id)].user_answers = answers
    await engine.save(test)


# @app.post('/test/answer', status_code=201)
# async def add_answer(test_id, user_answer: UserAnswer):
#     test = await engine.find_one(Test, Test.id == ObjectId(test_id))
#     test.user_answers.append(user_answer)
#     await engine.save(test)
#     return {'message': 'answer added'}
#
#
# @app.delete('/test/answer', status_code=204)
# async def delete_answer(test_id, answer_id):
#     test = await engine.find_one(Test, Test.id == ObjectId(test_id))
#     test.user_answers.pop(int(answer_id))
#     await engine.save(test)
#     return {'message': 'answer deleted'}
#
#
# @app.patch('/test/answer', status_code=200)
# async def modify_answer(test_id, answer_id, user_answer: UserAnswer):
#     test = await engine.find_one(Test, Test.id == ObjectId(test_id))
#     test.user_answers[int(answer_id)] = user_answer
#     await engine.save(test)
#     return {'message': 'answer modified'}


if __name__ == '__main__':
    uvicorn.run('src.main:app', host='0.0.0.0',
                port=8080, reload=True, debug=True)
