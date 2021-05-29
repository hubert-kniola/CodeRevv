export type TestCreator = {
  email: string;
  name: string;
  surname: string;
};

export type UserAnswer = {
  content: string;
  user: number;
  comment?: string;
  score: number;
};

export type Answer = {
  index: number;
  content: string;
  isCorrect?: boolean;
  usersVoted?: number[];
};

export type Question = {
  answers: Answer[];
  content: string;
  index: number;
  maxScore: number;
  questionType: string;
  userAnswers?: UserAnswer[];
};

export type Test = {
  id: string;
  creator: TestCreator;
  creatorId: number;
  testName: string;
  isLinkGenerated: boolean;
  creationDate: string;
  questions: Question[];
  isChecked: boolean;
  userIds?: number[];
};

export const testFromResponse = (data: any): Test => {
  return {
    isChecked: false,
    id: data.id,
    creator: {
      name: data.creator.first_name,
      surname: data.creator.last_name,
      email: data.creator.email,
    } as TestCreator,
    creatorId: data.creator_id,
    testName: data.name,
    isLinkGenerated: data.is_link_generated,
    creationDate: new Date(data.pub_test).toLocaleString(),
    userIds: undefined,
    questions: data.questions.map((q: any) => ({
      content: q.content,
      index: q.index,
      questionType: q.question_type,
      maxScore: q.max_score,
      userAnswers: null,
      answers: q.answers.map((a: any) => ({
        index: a.index,
        content: a.content,
        isCorrect: a.is_correct,
        usersVoted: null,
      })),
    })),
  };
};

export const testsFromResponse = (data: any): Test[] => data.tests.map((t: any) => testFromResponse(t));

export const testToResponse = (test: Test): any => ({
  creator: test.creatorId,
  name: test.testName,
  is_link_generated: test.isLinkGenerated,
  pub_test: new Date(test.creationDate).toLocaleString(),
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
});
