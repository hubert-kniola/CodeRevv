from typing import Optional, List, Dict

from odmantic import Model, EmbeddedModel


class UserAnswer(EmbeddedModel):
    content: Optional[str]
    user: int
    comment: Optional[str]
    score: float
    result_statistics: Optional[str]


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
    # ======= Judge0 ========
    creator_code: Optional[str]
    example_input: Optional[str]
    input_type: [Optional]


class TestUser(EmbeddedModel):
    attempt_count: int
    finished: bool


class Test(Model):
    __test__ = False
    name: str
    pub_test: Optional[str]
    creator: int
    users: Optional[Dict[str, TestUser]]
    questions: List[Question]
    creator_contact: Optional[str]  # always optional
    description: Optional[str]
    is_link_generated: bool
    # ============================
    start_time: Optional[str]  # !
    stop_time: Optional[str]  # !
    is_visible: Optional[bool]  # !
    is_finished: Optional[bool]  # !
    max_score: Optional[float]  # !\
    pass_treshold: Optional[float]

