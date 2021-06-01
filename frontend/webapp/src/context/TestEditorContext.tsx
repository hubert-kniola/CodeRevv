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
  setTestName: (t: string | SetTestNameDispatch) => void;
  addEmptyQuestion: () => void;
  setSingleQuestion: (q: EditorQuestion, i: number) => void;
  removeSingleQuestion: (i: number) => void;
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

export const TestEditorContextProvider: FC = ({ children }) => {
  const [testName, setTestName] = useState('');
  const [questions, setQuestions] = useState([newQuestion()] as EditorQuestion[]);

  const addEmptyQuestion = () => {
    setQuestions((qs) => [...qs, newQuestion()]);
  };

  const setSingleQuestion = (q: EditorQuestion, pos: number) => {
    setQuestions((qs) => [...qs.slice(0, pos), q, ...qs.slice(pos + 1)]);
  };

  const removeSingleQuestion = (pos: number) => {
    setQuestions((qs) => qs.filter((_, index) => index !== pos));
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
