import axios from 'axios';
import { Answer, Question, Test, TestCreator } from 'const';

export const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const captchaValidateHuman = async (token: string) => {
  try {
    const { data, status } = await apiAxios.post('/recaptcha/', { token });
    return status === 200 && data.success === true;
  } catch (err) {
    throw new Error('Nie mogliśmy nawiązać połączenia z Google.');
  }
};

export const getTestResults = async (testId: string): Promise<Test> => {
  const { data } = await apiAxios.get(`/test/results/${testId}`);
  let obj = {} as Test;
  try {
    obj = JSON.parse(data);
  } catch (err) {
    obj = JSON.parse(data.join(''));
  }

  return obj;
};

export const testFromResponse = (data: any, confidential: boolean = false): Test => {
  return {
    isChecked: false,
    maxScore: data.max_score,
    id: data.id,
    creator: {
      name: data.creator.first_name,
      surname: data.creator.last_name,
      email: data.creator.email,
    } as TestCreator,
    creatorId: data.creator_id,
    testName: data.name,
    isLinkGenerated: data.is_link_generated,
    creationDate: new Date(data.pub_test),
    userIds: confidential ? data.users : undefined,
    questions: data.questions.map((q: any) => ({
      content: q.content,
      index: q.index,
      questionType: q.question_type,
      maxScore: q.max_score,
      userAnswers: confidential ? q.user_answers : null,
      answers: q.answers.map((a: any) => ({
        index: a.index,
        content: a.content,
        isCorrect: a.is_correct,
        usersVoted: confidential ? a.users_voted : null,
      })),
    })),
    users: confidential
      ? data.users_data.map((u: any) => ({
          firstName: u.first_name,
          lastName: u.last_name,
          email: u.email,
          id: u.index,
        }))
      : null,
  };
};

export const testsFromResponse = (data: any, confidential: boolean = false): Test[] =>
  data.tests.map((t: any) => testFromResponse(t, confidential));

export const testToResponse = (test: Test): any => {
  return {
    creator: test.creatorId,
    name: test.testName,
    is_link_generated: test.isLinkGenerated,
    pub_test: test.creationDate.toLocaleString(),
    users: test.userIds,
    questions: test.questions.map((q: Question) => ({
      content: q.content,
      index: q.index,
      question_type: q.questionType,
      max_score: q.maxScore,
      user_answers: q.userAnswers,
      answers: q.answers.map((a: Answer) => ({
        index: a.index,
        content: a.content,
        is_correct: a.isCorrect,
        users_voted: a.usersVoted,
      })),
    })),
  };
};
