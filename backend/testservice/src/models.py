from typing import Optional, List

from odmantic import Model, EmbeddedModel


class UserAnswer(EmbeddedModel):
    question: int
    answer: str
    user: int
    comment: str
    score: float


class TestAnswer(EmbeddedModel):
    index: int
    content: str
    is_correct: bool


class Question(EmbeddedModel):
    index: int
    question_type: Optional[str]
    content: str
    answers: List[TestAnswer]
    max_score: Optional[int]


class Test(Model):
    __test__ = False
    name: str
    pub_test: Optional[str]
    creator: int
    users: Optional[List[int]]
    questions: List[Question]
    user_answers: Optional[List[UserAnswer]]


class TestSearcher(Model):
    creator_id: int
    test_id: str
    users_id: List[int]
