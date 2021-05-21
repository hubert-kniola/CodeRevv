import { FC, useEffect, useState, MouseEvent, useContext } from 'react';
import RichTextEditor from 'react-rte';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { QuestionContainer, Button, AnswerBlock, AnswerContainer } from './style';
import { Question, Answer, newAnswer, TestEditorContext } from 'context';
import { toolbarConfig } from 'const';

type QuestionEditorProps = {
  index: number;
  question: Question;
};

export const QuestionEditor: FC<QuestionEditorProps> = ({ index, question }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { setSingleQuestion } = useContext(TestEditorContext);

  const replaceAnswer = (pos: number, value: Answer) => {
    setSingleQuestion(
      {
        ...question,
        answers: [...question.answers.slice(0, pos), value, ...question.answers.slice(pos + 1)],
      },
      index
    );
  };

  const removeAnswer = (pos: number) => {
    if (question.answers.length > 2) {
      setSingleQuestion(
        {
          ...question,
          answers: question.answers.filter((_, index) => index !== pos),
        },
        index
      );

      setButtonDisabled(false);
    }
  };

  const addAnswer = (e: MouseEvent) => {
    e.preventDefault();

    if (question.answers.length < 10) {
      setSingleQuestion(
        {
          ...question,
          answers: [...question.answers, newAnswer()],
        },
        index
      );
    } else {
      setButtonDisabled(true);
    }
  };

  return (
    <QuestionContainer>
      {question.error && <p>question.error</p>}

      <label>Pytanie {index + 1}: </label>
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        className="text-editor"
        value={question.value}
        onChange={(value) => setSingleQuestion({ ...question, value }, index)}
      />

      {question.answers.map((item, index) => (
        <AnswerEditor
          key={item.id}
          answerState={item}
          setAnswerState={(state) => replaceAnswer(index, state)}
          onDelete={() => removeAnswer(index)}
          answersCount={question.answers.length}
        />
      ))}
      <p>
        {buttonDisabled && (
          <>
            Każde pytanie może mieć tylko 10 odpowiedzi <HighlightOffIcon className="icon" />{' '}
          </>
        )}
      </p>

      <Button onClick={addAnswer} disabled={buttonDisabled}>
        Dodaj odpowiedź
      </Button>
    </QuestionContainer>
  );
};

type AnswerEditorProps = {
  answerState: Answer;
  setAnswerState: (value: Answer) => void;
  onDelete: () => void;
  answersCount: number;
};

export const AnswerEditor: FC<AnswerEditorProps> = ({ answerState, setAnswerState, onDelete, answersCount }) => {
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    if (deleteError) {
      setTimeout(() => {
        setDeleteError(false);
      }, 2000);
    }
  }, [deleteError]);

  const DeleteAnswer = () => {
    if (answersCount > 2) {
      onDelete();
    } else {
      setDeleteError(true);
    }
  };

  return (
    <AnswerContainer deleteError={deleteError}>
      <AnswerBlock className="test">
        <div className="div1">
          <RichTextEditor
            toolbarConfig={toolbarConfig}
            className="text-editor"
            value={answerState.value}
            onChange={(value) => setAnswerState({ ...answerState, value })}
          />
        </div>
        <div className="div2">
          <input
            type="checkbox"
            checked={answerState.isCorrect}
            onChange={() => setAnswerState({ ...answerState, isCorrect: !answerState.isCorrect })}
          />
          Poprawna
        </div>
        <div className="div3" onClick={DeleteAnswer}>
          <div className="div3_1">
            <DeleteForeverIcon className="ico" />
          </div>
          <div className="div3_2">Usuń</div>
        </div>
      </AnswerBlock>
      <p>
        {deleteError && (
          <>
            Każde pytanie musi zawierać dwie odpowiedzi! <HighlightOffIcon className="icon" />{' '}
          </>
        )}
      </p>
    </AnswerContainer>
  );
};
