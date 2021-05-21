import { FC, useRef, useState, useContext } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, TestEditorForm } from 'components';
import { Question, TestEditorContext, TestEditorContextProvider } from 'context';

import { apiAxios } from 'utility';
import { EditorValue } from 'react-rte';

const MIN_QUESTION_BODY = 5;
const MIN_ANSWER_BODY = 1;

const validateEditorValue = (e: EditorValue) => {
  const body = e.toString('markdown');

  if (body.trim().length <= MIN_QUESTION_BODY) {
    return true;
  }
  return false;
};

const TestEditorIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { testName, questions, setQuestions } = useContext(TestEditorContext);
  const errorRef = useRef<HTMLDivElement>(null);

  const getRawTestEditorData = () => ({
    testName,
    questions: questions.map((q, iQuestion) => ({
      index: iQuestion,
      body: q.value.toString('html'),
      answers: q.answers.map((a, iAnswer) => ({
        index: iAnswer,
        body: a.value.toString('html'),
        isCorrect: a.isCorrect,
      })),
    })),
  });

  const editorHasErrors = () => {
    let errorMessage = '';

    questions.forEach((q, iQuestion) => {
      if (validateEditorValue(q.value)) {
        errorMessage += `Pytanie ${
          iQuestion + 1
        } ma zbyt krótkie polecenie. Minimalna wartość to ${MIN_QUESTION_BODY}.\n`;
      }

      q.answers.forEach((a, iAnswer) => {
        if (validateEditorValue(a.value)) {
          errorMessage += `Odpowiedź numer ${iAnswer + 1} pytania ${
            iQuestion + 1
          } ma zbyt krótkie polecenie. Minimalna wartość to ${MIN_ANSWER_BODY}.\n`;
        }

        if (q.answers.filter((a) => a.isCorrect).length < 1) {
          errorMessage += `Pytanie ${iQuestion + 1} musi zawierać conajmniej jedną odpowiedź prawidłową.\n`;
        }
      });
    });

    return errorMessage;
  };

  const handleEditorSubmit = () => {
    setLoading(true);
    setError(null);

    if (editorHasErrors()) {
      console.log({ testName, data: getRawTestEditorData() });
    } else {
      setError('Formularz zawiera błędy.');
      scrollIntoMessageOverlay(errorRef);
    }

    setLoading(false);
  };

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Błąd" text={error!} noLogo />

      <LoadingOverlay active={loading} text="Czekamy na odpowiedź serwera..." logo>
        <TestEditorForm title="Stwórz nowy test" buttonText="Zakończ i zapisz" onSubmit={handleEditorSubmit} />
      </LoadingOverlay>
    </>
  );
};

export const TestEditor: FC = () => (
  <TestEditorContextProvider>
    <TestEditorIn />
  </TestEditorContextProvider>
);
