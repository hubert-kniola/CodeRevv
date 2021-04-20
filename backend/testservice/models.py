import uuid
from typing import Optional, List

from bson import ObjectId
from pydantic import BaseModel, Field


# class PyObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate
#
#     @classmethod
#     def validate(cls, v):
#         if not ObjectId.is_valid(v):
#             raise ValueError("Invalid objectid")
#         return ObjectId(v)
#
#     @classmethod
#     def __modify_schema__(cls, field_schema):
#         field_schema.update(type="string")


class QuestionModel(BaseModel):
    question_type: str = Field(...)
    content: str = Field(...)
    answer: str = Field(...)
    max_score: float = Field(...)


class AnswerModel(BaseModel):
    question: int = Field(...)
    answer: str = Field(...)
    user: int = Field(...)
    comment: str = Field(...)
    score: float = Field(...)


class TestModel(BaseModel):
    name: str = Field(...)
    pub_test: str = Field(...)
    creator: int = Field(...)
    users: list[int] = Field(...)
    question: Optional[List[QuestionModel]] = Field(...)
    user_answers: Optional[List[AnswerModel]] = Field(...)

    class Config:
        schema_extra = {
            "example": {
                  "_id": "string",
                  "name": "string",
                  "pub_test": "string",
                  "creator": 0,
                  "users": [
                    0
                  ],
                  "question": [
                    {
                      "_id": "string",
                      "question_type": "string",
                      "content": "string",
                      "answer": "string",
                      "max_score": 0
                    }
                  ],
                  "user_answers": [
                    {
                      "_id": "string",
                      "question": 0,
                      "answer": "string",
                      "user": 0,
                      "comment": "string",
                      "score": 0
                    }
                  ]
                }
        }


