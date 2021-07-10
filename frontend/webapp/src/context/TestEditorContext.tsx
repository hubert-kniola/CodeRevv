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
  isOpen: boolean;
};

export type SetTestNameDispatch = (s: string) => string;

export type QuestionStore = {
  active: EditorQuestion[];
  hinted: EditorQuestion[];
};

export interface ITestEditorContext {
  testName: string;
  questions: QuestionStore;
  setTestName: (t: string | SetTestNameDispatch) => void;
  addEmptyQuestion: () => void;
  setActiveQuestion: (q: EditorQuestion, i: number) => void;
  setHintedQuestion: (q: EditorQuestion, i: number) => void;
  moveQuestionToActive: (f: number, t: number) => void;
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
    isOpen: true,
  } as EditorQuestion);

const dummyQuestion = () => {
  const q = newQuestion();

  q.maxScore = 10;
  q.isOpen = false;
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
  const [questions, setQuestions] = useState({
    active: [newQuestion()],
    hinted: [dummyQuestion(), dummyQuestion()],
  } as QuestionStore);

  const addEmptyQuestion = () => {
    setQuestions((qs) => ({
      ...qs,
      active: [...qs.active, newQuestion()],
    }));
  };

  const setActiveQuestion = (q: EditorQuestion, pos: number) => {
    setQuestions((qs) => ({
      ...qs,
      active: [...qs.active.slice(0, pos), q, ...qs.active.slice(pos + 1)],
    }));
  };

  const setHintedQuestion = (q: EditorQuestion, pos: number) => {
    setQuestions((qs) => ({
      ...qs,
      hinted: [...qs.hinted.slice(0, pos), q, ...qs.hinted.slice(pos + 1)],
    }));
  };

  const removeSingleQuestion = (pos: number) => {
    setQuestions((qs) => ({
      ...qs,
      active: qs.active.filter((_, index) => index !== pos),
    }));
  };

  const swapQuestions = (first: number, second: number) => {
    setQuestions((qs) => ({
      ...qs,
      active: qs.active.map((current, index) => {
        if (index === first) return qs.active[second];
        if (index === second) return qs.active[first];
        return current;
      }),
    }));
  };

  const moveQuestionToActive = (from: number, to: number) => {
    setQuestions((qs) => {
      const sourceClone = [...qs.hinted];
      const destClone = [...qs.active];
      const [removed] = sourceClone.splice(from, 1);

      destClone.splice(to, 0, removed);

      return {
        ...qs,
        active: destClone,
        hinted: sourceClone,
      };
    });
  };

  return (
    <TestEditorContext.Provider
      value={{
        questions,
        testName,
        setTestName,
        addEmptyQuestion,
        setActiveQuestion,
        setHintedQuestion,
        removeSingleQuestion,
        moveQuestionToActive,
        swapQuestions,
      }}
    >
      {children}
    </TestEditorContext.Provider>
  );
};
