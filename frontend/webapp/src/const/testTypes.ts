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

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
};

export type Test = {
  id: string;
  creator: TestCreator;
  creatorId: number;
  testName: string;
  isLinkGenerated: boolean;
  creationDate: Date;
  questions: Question[];
  isChecked: boolean;
  userIds?: number[];
  maxScore?: number;
  users?: User[];
};
