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

export type SetQuestionLambda = (q: Question) => Question;
export type SetQuestionsLambda = (qs: Question[]) => Question[];
export type SetTestNameLambda = (s: string) => string;

export interface ITestEditorContext {
  testName: string;
  questions: Question[];
  setQuestions: (qs: Question[] | SetQuestionsLambda) => void;
  setTestName: (t: string | SetTestNameLambda) => void;
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
