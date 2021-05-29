from fastapi.params import Body
from src.functions import check_answers, get_test_with_user_answers_for_user
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


@app.post('/test/{test_id}/{user_id}', response_model=Test, status_code=200)
async def join_test(test_id, user_id):
    user_id = int(user_id)
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    if test.creator == user_id:
        # if not test.users:
        #     test.users = [user_id]
        # elif user_id not in test.users:
        #     test.users.append(user_id)

        return await engine.save(test)

    elif test.is_link_generated:
        if not test.users:
            test.users = [user_id]
            return await engine.save(test)

        if user_id not in test.users:
            test.users.append(user_id)
            return await engine.save(test)

        else:
            return JSONResponse(status_code=status.HTTP_409_CONFLICT)

    elif not test.is_link_generated:
        if test.users:
            if user_id in test.users:
                return test

    return JSONResponse(status_code=status.HTTP_403_FORBIDDEN)


@app.patch('/test/finish/{test_id}', status_code=200)
async def finish_test(test_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    if not test.is_finished:
        test.is_finished = True

        if test.users:
            test = check_answers(test)

        await engine.save(test)
        return {'status': 'the test has just finished'}
    else:
        return {'status': 'the test is already finished'}


@app.get('/test/result/{test_id}/{user_id}', response_model=Test, status_code=200)
async def result_test(test_id, user_id):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    user_id = int(user_id)

    if user_id not in test.users and test.creator != user_id:
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN)

    test = check_answers(test)
    test = await engine.save(test)

    if test.creator == user_id:
        return test

    return get_test_with_user_answers_for_user(test, user_id)


@app.get('/test/list/{user_id}', response_model=List[Test], status_code=200)
async def list_test(user_id):
    tests = await engine.find(Test)
    user_id = int(user_id)
    response_tests = []
    for test in tests:
        if user_id in test.users:
            response_tests.append(test)
    return response_tests


@app.get('/test/list/creator/{user_id}', response_model=List[Test], status_code=200)
async def creator_tests(user_id):
    tests = await engine.find(Test)
    user_id = int(user_id)
    response_tests = []
    for test in tests:
        if test.creator == user_id:
            response_tests.append(test)
    return response_tests


@app.post('/test/create', response_model=Test, status_code=201)
async def create_test(test: Test):
    test.pub_test = str(datetime.now())
    
    if not test.users:
        test.users = []

    new_test = await engine.save(test)
    created_test = await engine.find_one(Test, Test.id == new_test.id)
    return created_test


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


@app.post('/test/save', response_model=Test, status_code=200)
async def save_test(test_id, user_id, modified_test: Test):
    test = await engine.find_one(Test, Test.id == ObjectId(test_id))
    user_id = int(user_id)

    if user_id == test.creator:
        return test

    for question in modified_test.questions:
        for answer in question.answers:
            if answer.users_voted:  # sprawdzenie czy dany użytkownik dał odpowiedź
                for iq, og_question in enumerate(test.questions):
                    if question.index == og_question.index:
                        for ia, og_answer in enumerate(og_question.answers):
                            if answer.index == og_answer.index:
                                if not og_answer.users_voted:
                                    test.questions[iq].answers[ia].users_voted = [
                                        user_id]
                                else:
                                    test.questions[iq].answers[ia].users_voted.append(
                                        user_id)
                                break

                        break

    await engine.save(test)
    return await engine.find_one(Test, Test.id == ObjectId(test_id))


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
