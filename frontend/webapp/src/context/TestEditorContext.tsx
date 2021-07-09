import { createContext, useState, FC } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import { nanoid } from 'nanoid';

export type EditorAnswer = {
  id: string;
  value: EditorValue;
  isCorrect: boolean;
  error: string | null;
};

export type EditorQuestion = {
  id: string;
  value: EditorValue;
  type: string;
  answers?: EditorAnswer[];
  maxScore: number;
  lock: boolean;
  error: string | null;
};

export type SetTestNameDispatch = (s: string) => string;

export interface ITestEditorContext {
  testName: string;
  questions: EditorQuestion[];
  previousQuestions: EditorQuestion[];
  setTestName: (t: string | SetTestNameDispatch) => void;
  addEmptyQuestion: () => void;
  addQuestionInPosition: (q: EditorQuestion, p: number) => void;
  setSingleQuestion: (q: EditorQuestion, i: number) => void;
  popPreviousQuestionAtPosition: (p: number) => EditorQuestion;
  removeSingleQuestion: (i: number) => void;
  swapQuestions: (f: number, s: number) => void;
}

export const TestEditorContext = createContext({} as ITestEditorContext);

export const newAnswer = () =>
  ({
    id: nanoid(),
    value: RichTextEditor.createEmptyValue(),
    isCorrect: false,
    error: null,
  } as EditorAnswer);

export const newQuestion = () =>
  ({
    id: nanoid(),
    value: RichTextEditor.createEmptyValue(),
    answers: [newAnswer(), newAnswer()],
    maxScore: 1,
    type: 'closed',
    lock: false,
    error: null,
  } as EditorQuestion);

const dummyQuestion = () => {
  const q = newQuestion();

  q.maxScore = 10;
  q.value = RichTextEditor.createValueFromString(
    '<b>To jest dopiero odpowiedź!</b> Taka z długim tekstem i w ogóle to Hubert Hubertowski hubertował Hubertów. Dobra potrzebuje więcej żeby ustalić fontsize jakiś sensowny',
    'html'
  );

  q.answers![0].isCorrect = true;
  q.answers![0].value = RichTextEditor.createValueFromString('<h1>Jeszcze jak</h1>', 'html');

  return q;
};

export const TestEditorContextProvider: FC = ({ children }) => {
  const [testName, setTestName] = useState('');
  const [questions, setQuestions] = useState([newQuestion()] as EditorQuestion[]);
  const [previousQuestions, setPreviousQuestions] = useState([dummyQuestion(), dummyQuestion()] as EditorQuestion[]);

  const addEmptyQuestion = () => {
    setQuestions((qs) => [...qs, newQuestion()]);
  };

  const setSingleQuestion = (q: EditorQuestion, pos: number) => {
    setQuestions((qs) => [...qs.slice(0, pos), q, ...qs.slice(pos + 1)]);
  };

  const removeSingleQuestion = (pos: number) => {
    setQuestions((qs) => qs.filter((_, index) => index !== pos));
  };

  const swapQuestions = (first: number, second: number) => {
    setQuestions((_) =>
      questions.map((current, index) => {
        if (index === first) return questions[second];
        if (index === second) return questions[first];
        return current;
      })
    );
  };

  const addQuestionInPosition = (q: EditorQuestion, pos: number) => {
    setQuestions((qs) => [...qs.slice(0, pos), q, ...qs.slice(pos)]);
  };

  const popPreviousQuestionAtPosition = (pos: number) => {
    const question = previousQuestions.find((_, ix) => ix === pos)!;

    setPreviousQuestions(previousQuestions.filter((_, ix) => ix !== pos));
    console.log({previousQuestions})

    return question;
  };

  return (
    <TestEditorContext.Provider
      value={{
        questions,
        previousQuestions,
        testName,
        setTestName,
        addEmptyQuestion,
        addQuestionInPosition,
        setSingleQuestion,
        removeSingleQuestion,
        popPreviousQuestionAtPosition,
        swapQuestions,
      }}
    >
      {children}
    </TestEditorContext.Provider>
  );
};
