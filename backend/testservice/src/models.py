from typing import Optional, List

from odmantic import Model, EmbeddedModel


class UserAnswer(EmbeddedModel):
    content: Optional[str]
    user: int
    comment: Optional[str]
    score: float


class TestAnswer(EmbeddedModel):
    index: int
    content: str
    is_correct: bool
    users_voted: Optional[List[int]]


class Question(EmbeddedModel):
    index: int
    question_type: Optional[str]
    content: str
    answers: List[TestAnswer]
    max_score: Optional[float]
    user_answers: Optional[List[UserAnswer]]


class Test(Model):
    __test__ = False
    name: str
    pub_test: Optional[str]
    creator: int
    users: Optional[List[int]]
    questions: List[Question]
    is_link_generated: bool
    # pozniej usunac stary test i dodac nowy, usunac optional!
    start_time: Optional[str]  # !
    stop_time: Optional[str]  # !
    is_visible: Optional[bool]  # !
    is_finished: Optional[bool]  # !
    max_score: Optional[float]  # !



class TestSearcher(Model):
    creator_id: int
    test_id: str
    users_id: List[int]
