import { createContext, useState, FC } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import { nanoid } from 'nanoid';

export type Answer = {
  id: string;
  value: EditorValue;
  isCorrect: boolean;
  error: string | null;
};

export type Question = {
  id: string;
  value: EditorValue;
  answers: Answer[];
  maxScore: number;
  lock: boolean;
  error: string | null;
};

export type SetTestNameDispatch = (s: string) => string;

export interface ITestEditorContext {
  testName: string;
  questions: Question[];
  setTestName: (t: string | SetTestNameDispatch) => void;
  addEmptyQuestion: () => void;
  setSingleQuestion: (q: Question, i: number) => void;
  removeSingleQuestion: (i: number) => void;
}

export const TestEditorContext = createContext({} as ITestEditorContext);

export const newAnswer = () =>
  ({
    id: nanoid(),
    value: RichTextEditor.createEmptyValue(),
    isCorrect: false,
    error: null,
  } as Answer);

export const newQuestion = () =>
  ({
    id: nanoid(),
    value: RichTextEditor.createEmptyValue(),
    answers: [newAnswer(), newAnswer()],
    maxScore: 1,
    lock: false,
    error: null,
  } as Question);

export const TestEditorContextProvider: FC = ({ children }) => {
  const [testName, setTestName] = useState('');
  const [questions, setQuestions] = useState([newQuestion()] as Question[]);

  const addEmptyQuestion = () => {
    setQuestions((questions) => [...questions, newQuestion()]);
  };

  const setSingleQuestion = (q: Question, pos: number) => {
    setQuestions((questions) => [...questions.slice(0, pos), q, ...questions.slice(pos + 1)]);
  };

  const removeSingleQuestion = (pos: number) => {
    setQuestions((questions) => questions.filter((_, index) => index !== pos));
  };

  return (
    <TestEditorContext.Provider
      value={{
        questions,
        testName,
        setTestName,
        addEmptyQuestion,
        setSingleQuestion,
        removeSingleQuestion,
      }}
    >
      {children}
    </TestEditorContext.Provider>
  );
};
