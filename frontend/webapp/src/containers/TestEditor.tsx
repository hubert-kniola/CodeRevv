import { FC, useRef, useState, useContext } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, TestEditorForm } from 'components';
import { EditorQuestion, TestEditorContext, TestEditorContextProvider } from 'context';

import { EditorValue } from 'react-rte';
import { apiAxios } from 'utility';
import { useHistory } from 'react-router-dom';

const MIN_QUESTION_BODY = 5;
const MIN_ANSWER_BODY = 1;

const isEditorValueInvalid = (e: EditorValue, min: number) => {
  const body = e.toString('markdown').replace(/[^\x20-\x7E]/g, '');

  console.log({ body, isEmpty: body === '', len: body.length, min });

  if (body === '' || body.length < min) {
    return true;
  }

  return false;
};

const TestEditorIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { testName, questions, setSingleQuestion } = useContext(TestEditorContext);
  const errorRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const getRawTestEditorData = () => ({
    name: testName,
    questions: questions.map((q, iQuestion) => ({
      index: iQuestion,
      content: q.value.toString('html'),
      question_type: q.type,
      max_score: q.maxScore,
      answers: q.answers?.map((a, iAnswer) => ({
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

      if (isEditorValueInvalid(q.value, MIN_QUESTION_BODY)) {
        errorMessage += `Zbyt krótkie polecenie, minimalna ilość znaków to ${MIN_QUESTION_BODY}.\n`;
      }

      let tempQuestion: EditorQuestion | null = null;

      if (q.answers !== undefined) {
        if (q.answers.filter((a) => a.isCorrect).length < 1) {
          errorMessage += `Pytanie musi zawierać co najmniej jedną odpowiedź prawidłową.\n`;
        }

        q.answers.forEach((a, iAnswer) => {
          if (isEditorValueInvalid(a.value, MIN_ANSWER_BODY)) {
            const error = `Odpowiedź ma zbyt krótkie polecenie, minimalna ilość znaków to ${MIN_ANSWER_BODY}.\n`;

            if (tempQuestion === null) {
              tempQuestion = { ...q };
            }

            tempQuestion = {
              ...tempQuestion,
              answers: [
                ...tempQuestion.answers!.slice(0, iAnswer),
                { ...a, error },
                ...tempQuestion.answers!.slice(iAnswer + 1),
              ],
            } as EditorQuestion;

            hadErrors = true;
          }
        });
      }

      if (errorMessage.length !== 0) {
        hadErrors = true;

        if (tempQuestion != null) {
          setSingleQuestion({ ...(tempQuestion as EditorQuestion), error: errorMessage }, iQuestion);
        } else {
          setSingleQuestion({ ...q, error: errorMessage }, iQuestion);
        }
      } else if (tempQuestion != null) {
        hadErrors = true;

        setSingleQuestion({ ...(tempQuestion as EditorQuestion), error: null }, iQuestion);
      }
    });

    return hadErrors;
  };

  const handleEditorSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!editorHasErrors()) {
      try {
        await apiAxios.post('/t/create', getRawTestEditorData());
        history.push('/dashboard/view/tests');
      } catch (err) {
        if (err.response) {
          setError('Nie udało się stworzyć testu.\nSpróbuj ponownie po odświeżeniu strony.');
        } else {
          setError('Nasz serwer nie odpowiada.\nJeśli masz dostęp do internetu oznacza to że mamy awarię :(');
        }

        scrollIntoMessageOverlay(errorRef);
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

      <div style={{marginBottom: '200px'}}/>
    </>
  );
};

export const TestEditor: FC = () => (
  <TestEditorContextProvider>
    <TestEditorIn />
  </TestEditorContextProvider>
);
