from typing import Optional, List

from odmantic import Model, EmbeddedModel


class Question(EmbeddedModel):
    question_type: str
    content: str
    answer: str
    max_score: float


class Answer(EmbeddedModel):
    question: int
    answer: str
    user: int
    comment: str
    score: float


class Test(Model):
    __test__ = False
    name: str
    pub_test: str
    creator: int
    users: List[int]
    questions: Optional[List[Question]]
    user_answers: Optional[List[Answer]]


class TestSearcher(Model):
    creator_id: int
    test_id: str
    users_id: List[int]