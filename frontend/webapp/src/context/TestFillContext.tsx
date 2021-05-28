import { Question, Test, testFromResponse, testToResponse } from 'const';
import { createContext, FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { apiAxios } from 'utility';

/* Randomize array with deepcopy using Durstenfeld shuffle algorithm */
const shuffleArray = (array: any[]): any[] => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return JSON.parse(JSON.stringify(array));
};

const shuffleTest = (t: Test): Test => {
  const questions = t.questions.map((q) => ({
    ...q,
    answers: shuffleArray(q.answers),
  }));

  return { ...t, questions: shuffleArray(questions) };
};

type RouteParams = {
  id: string;
};

export interface ITestFillContext {
  test?: Test;
  hasStarted: boolean;
  hasEnded: boolean;
  activeIndex: number;
  onTestInit: () => Promise<void>;
  onTestStart: () => void;
  onPartialSubmit: () => void;
  onSubmit: () => void;
  switchQuestion: (p: number) => void;
  toggleAnswerForActiveQuestion: (p: number) => void;
  getActiveQuestion: () => Question;
}

export const TestFillContext = createContext({} as ITestFillContext);

export const TestFillContextProvider: FC = ({ children }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [test, setTest] = useState<Test | undefined>(undefined);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { id } = useParams<RouteParams>();

  const switchQuestion = (pos: number) => {
    if (pos >= test!.questions.length) {
      setActiveIndex((_) => 0);
    } else if (pos < 0) {
      setActiveIndex((_) => test!.questions.length - 1);
    } else {
      setActiveIndex((_) => pos);
    }
  };

  const toggleAnswerForActiveQuestion = (answerIndex: number) => {
    let voted = [] as number[] | null;

    // MARKING
    let usersVotedLen = test!.questions[activeIndex].answers[answerIndex].usersVoted?.length;
    if (usersVotedLen != null && usersVotedLen > 0) {
      voted = null;
    } else {
      voted = [1];
    }

    setTest({
      ...test,
      questions: [
        ...test!.questions.slice(0, activeIndex),
        {
          ...test!.questions[activeIndex],
          answers: test!.questions[activeIndex].answers.map((a, i) =>
            i === answerIndex ? { ...a, usersVoted: voted } : a
          ),
        },
        ...test!.questions.slice(activeIndex + 1),
      ],
    } as Test);
  };

  const onTestInit = async () => {
    const { data } = await apiAxios.post(`/test/join/${id}`);
    const rawTest = testFromResponse(data);

    setTest((_) => shuffleTest(rawTest));
  };

  const onTestStart = () => {
    setHasStarted(true);

    if (currentTimeout != null) {
      clearTimeout(currentTimeout);
      setCurrentTimeout((_) => null);
    }

    setCurrentTimeout((_) => setTimeout(() => onPartialSubmit(), 10000));
  };

  const onPartialSubmit = async () => {};

  const onSubmit = async () => {
    await apiAxios.post(`/test/submit`, { test_id: id, test: testToResponse(test!) });

    clearTimeout(currentTimeout!);
    setCurrentTimeout((_) => null);
    setHasEnded(true);
  };

  const getActiveQuestion = () => test!.questions[activeIndex];

  return (
    <TestFillContext.Provider
      value={{
        test,
        hasStarted,
        hasEnded,
        activeIndex,
        onTestInit,
        onTestStart,
        onPartialSubmit,
        onSubmit,
        toggleAnswerForActiveQuestion,
        switchQuestion,
        getActiveQuestion,
      }}
    >
      {children}
    </TestFillContext.Provider>
  );
};
