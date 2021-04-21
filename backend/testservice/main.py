import uvicorn

from fastapi import FastAPI, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List
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


@app.post('/create', response_model=models.Test)
async def create_test(test: models.Test):
    new_test = await engine.save(test)
    created_test = await engine.find_one(models.Test, models.Test.id == new_test.id)

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(created_test))


@app.get('/tests', response_model=List[models.Test])
async def tests_list():
    tests = await engine.find(models.Test)

    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(tests))


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8080, reload=True, debug=True)
