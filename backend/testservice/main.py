from fastapi import FastAPI, Body, status
import uvicorn
import motor.motor_asyncio
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List

import models

app = FastAPI()

MONGODB_URL='mongodb+srv://admin:<admin>@cluster0.k1eh0.mongodb.net/Cluster0?retryWrites=true&w=majority'
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
db = client.Cluster0


@app.post('/create', response_model=models.TestModel)
async def create_test(test: models.TestModel = Body(...)):
    test = jsonable_encoder(test)
    new_test = await db['server_onlinetest'].insert_one(test)
    created_test = await db['server_onlinetest'].find_one({'_id': new_test.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_test)


@app.get('/tests', response_model=List[models.TestModel])
async def tests_list():
    tests = await db['server_onlinetest'].find().to_list(1000)
    return tests


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8080)


