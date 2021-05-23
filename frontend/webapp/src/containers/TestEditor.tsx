import { FC, useRef, useState, useContext } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, TestEditorForm } from 'components';
import { Question, TestEditorContext, TestEditorContextProvider } from 'context';

import { EditorValue } from 'react-rte';
import { apiAxios } from 'utility';

const MIN_QUESTION_BODY = 5;
const MIN_ANSWER_BODY = 1;

const validateEditorValue = (e: EditorValue, min: number) => {
  const body = e.toString('markdown');

  if (body.trim().length <= min) {
    return true;
  }
  return false;
};

const TestEditorIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { testName, questions, setSingleQuestion } = useContext(TestEditorContext);
  const errorRef = useRef<HTMLDivElement>(null);

  const getRawTestEditorData = () => ({
    name: testName,
    questions: questions.map((q, iQuestion) => ({
      index: iQuestion,
      content: q.value.toString('html'),
      answers: q.answers.map((a, iAnswer) => ({
        index: iAnswer,
        content: a.value.toString('html'),
        is_correct: a.isCorrect,
      })),
    })),
  });

  const editorHasErrors = () => {
    let hadErrors = false;
    questions.forEach((q, iQuestion) => {
      let errorMessage = '';

      if (validateEditorValue(q.value, MIN_QUESTION_BODY)) {
        errorMessage += `Zbyt krótkie polecenie, minimalna ilość znaków to ${MIN_QUESTION_BODY}.\n`;
      }

      if (q.answers.filter((a) => a.isCorrect).length < 1) {
        errorMessage += `Pytanie musi zawierać conajmniej jedną odpowiedź prawidłową.\n`;
      }

      let tempQuestion: Question | null = null;

      q.answers.forEach((a, iAnswer) => {
        if (validateEditorValue(a.value, MIN_ANSWER_BODY)) {
          const error = `Odpowiedź ma zbyt krótkie polecenie, minimalna ilość znaków to ${MIN_ANSWER_BODY}.\n`;

          if (tempQuestion == null) {
            tempQuestion = { ...q };
          }

          tempQuestion = {
            ...tempQuestion,
            answers: [
              ...tempQuestion.answers.slice(0, iAnswer),
              { ...a, error },
              ...tempQuestion.answers.slice(iAnswer + 1),
            ],
          } as Question;

          hadErrors = true;
        }
      });

      if (errorMessage.length !== 0) {
        hadErrors = true;

        if (tempQuestion != null) {
          setSingleQuestion({ ...(tempQuestion as Question), error: errorMessage }, iQuestion);
        } else {
          setSingleQuestion({ ...q, error: errorMessage }, iQuestion);
        }
      } else if (tempQuestion != null) {
        hadErrors = true;

        setSingleQuestion(tempQuestion, iQuestion);
      }
    });

    return hadErrors;
  };

  const handleEditorSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!editorHasErrors()) {
      try {
        const { data } = await apiAxios.post('/test/create', getRawTestEditorData());

        console.log(data);
      } catch (err) {
        console.log(err);
      }
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
