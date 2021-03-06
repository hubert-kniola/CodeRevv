import { FC, useRef, useState, useContext } from 'react';

import {
  LoadingOverlay,
  MessageOverlay,
  QuestionCollection,
  scrollIntoMessageOverlay,
  TestEditorForm,
} from 'components';

import { EditorQuestion, TestEditorContext, TestEditorContextProvider } from 'context';

import { EditorValue } from 'react-rte';
import { apiAxios } from 'utility';
import { useHistory } from 'react-router-dom';
import { DropResult, DragDropContext } from 'react-beautiful-dnd';
import { Grid } from '@material-ui/core';
import { MIN_ANSWER_BODY, MIN_QUESTION_BODY, testEditorErrors } from 'const';

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
  const { testName, questions, setActiveQuestion, moveQuestionToActive, swapQuestions } = useContext(TestEditorContext);
  const errorRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const getRawTestEditorData = () => ({
    name: testName,
    questions: questions.active.map((q, iQuestion) => ({
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
    questions.active.forEach((q, iQuestion) => {
      let errorMessage = '';

      if (isEditorValueInvalid(q.value, MIN_QUESTION_BODY)) {
        errorMessage += testEditorErrors.shortQuestion;
      }

      let tempQuestion: EditorQuestion | null = null;

      if (q.answers !== undefined) {
        if (q.answers.filter((a) => a.isCorrect).length < 1) {
          errorMessage += testEditorErrors.atLeastOneCorrectAnswer;
        }

        q.answers.forEach((a, iAnswer) => {
          if (isEditorValueInvalid(a.value, MIN_ANSWER_BODY)) {
            const error = testEditorErrors.shortAnswer;

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
          setActiveQuestion({ ...(tempQuestion as EditorQuestion), error: errorMessage }, iQuestion);
        } else {
          setActiveQuestion({ ...q, error: errorMessage }, iQuestion);
        }
      } else if (tempQuestion != null) {
        hadErrors = true;

        setActiveQuestion({ ...(tempQuestion as EditorQuestion), error: testEditorErrors.errorInAnswer }, iQuestion);
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
      } catch (err: any) {
        if (err.response) {
          setError('Nie uda??o si?? stworzy?? testu.\nSpr??buj ponownie po od??wie??eniu strony.');
        } else {
          setError('Nasz serwer nie odpowiada.\nJe??li masz dost??p do internetu oznacza to ??e mamy awari?? :(');
        }

        scrollIntoMessageOverlay(errorRef);
      }
    } else {
      setError('Formularz zawiera b????dy.');
      scrollIntoMessageOverlay(errorRef);
    }

    setLoading(false);
  };

  const editorTitle = 'Stw??rz nowy test';
  const collectionTitle = 'Moje poprzednie pytania';

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      swapQuestions(source.index, destination.index);
    } else {
      moveQuestionToActive(source.index, destination.index);
    }

    //TODO drag first and drop into first BUG DK WAT TO DO
  };

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="B????d" text={error!} noLogo />

      <LoadingOverlay active={loading} text="Czekamy na odpowied?? serwera..." logo>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container>
            <Grid item xs>
              <TestEditorForm title={editorTitle} onSubmit={handleEditorSubmit} />
            </Grid>
            <Grid item xs>
              <QuestionCollection title={collectionTitle} />
            </Grid>
          </Grid>
        </DragDropContext>
      </LoadingOverlay>

      <div style={{ marginBottom: '200px' }} />
    </>
  );
};

export const TestEditor: FC = () => (
  <TestEditorContextProvider>
    <TestEditorIn />
  </TestEditorContextProvider>
);
