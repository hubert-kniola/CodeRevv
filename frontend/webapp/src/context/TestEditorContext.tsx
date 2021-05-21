import { createContext, useState, FC } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import { nanoid } from 'nanoid';

export type Answer = {
  id: string;
  value: EditorValue;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  value: EditorValue;
  answers: Answer[];
  lock: boolean;
};

export type SetQuestionsDispatch = (qs: Question[]) => Question[];
export type SetTestNameDispatch = (s: string) => string;

export interface ITestEditorContext {
  testName: string;
  questions: Question[];
  setQuestions: (qs: Question[] | SetQuestionsDispatch) => void;
  setTestName: (t: string | SetTestNameDispatch) => void;
}

export const TestEditorContext = createContext({} as ITestEditorContext);

export const newAnswer = () =>
  ({
    id: nanoid(),
    value: RichTextEditor.createEmptyValue(),
    isCorrect: false,
  } as Answer);

export const newQuestion = () =>
  ({
    id: nanoid(),
    value: RichTextEditor.createEmptyValue(),
    answers: [newAnswer(), newAnswer()],
    lock: false,
  } as Question);

export const TestEditorContextProvider: FC = ({ children }) => {
  const [testName, setTestName] = useState('');
  const [questions, setQuestions] = useState([newQuestion()] as Question[]);

  return (
    <TestEditorContext.Provider value={{ questions, setQuestions, testName, setTestName }}>
      {children}
    </TestEditorContext.Provider>
  );
};
