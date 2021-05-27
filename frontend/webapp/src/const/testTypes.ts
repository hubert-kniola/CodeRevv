export type UserAnswer = {
  content: string;
  user: number;
  comment?: string;
  score: number;
};

export type Answer = {
  index: number;
  content: string;
  isCorrect: boolean;
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
  creatorId: number;
  testName: string;
  isLinkGenerated: boolean;
  creationDate: string;
  questions: Question[];
  userIds: number[];
};

export const testFromResponse = (data: any): Test => ({
  id: data.id,
  creatorId: data.creator,
  testName: data.name,
  isLinkGenerated: data.is_link_generated,
  creationDate: new Date(data.pub_test).toLocaleString(),
  userIds: data.users,
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
      usersVoted: a.users_voted,
    })),
  })),
});

export const testsFromResponse = (data: any): Test[] => data.tests.map((t: any) => testFromResponse(t));
