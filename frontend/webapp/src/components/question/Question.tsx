import { FC, useEffect, useState, MouseEvent, useContext, useRef } from 'react';
import RichTextEditor from 'react-rte';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grow from '@material-ui/core/Grow';

import { QuestionContainer, Button, AnswerBlock, AnswerContainer, ErrorText } from './style';
import { Question, Answer, newAnswer, TestEditorContext } from 'context';
import { toolbarConfig } from 'const';

type QuestionEditorProps = {
  index: number;
  question: Question;
};

export const QuestionEditor: FC<QuestionEditorProps> = ({ index, question }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [grow, setGrow] = useState(true);
  const { setSingleQuestion } = useContext(TestEditorContext);
  const questionRef = useRef(question);
  questionRef.current = question;

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

  useEffect(() => {
    if (question.error != null) {
      setTimeout(() => {
        setGrow(false);
      }, 1800);

      setTimeout(() => {
        setSingleQuestion({ ...questionRef.current, error: null }, index);
        setGrow(true);
      }, 2000);
    }
  }, [question.value]);

  return (
    <QuestionContainer error={question.error != null}>
      <label>Pytanie {index + 1}: </label>

      <Grow in={grow} timeout={500}>
        <ErrorText>{question.error}</ErrorText>
      </Grow>

      <RichTextEditor
        toolbarConfig={toolbarConfig}
        className="text-editor"
        value={question.value}
        onChange={(value) => setSingleQuestion({ ...question, value }, index)}
      />

      <input
        type="number"
        min={1}
        max={10}
        step={0.5}
        value={question.maxScore}
        onChange={(e) => setSingleQuestion({ ...question, maxScore: +e.target.value }, index)}
      />

      {question.answers.map((item, index) => (
        <AnswerEditor
          key={item.id}
          answer={item}
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
  answer: Answer;
  setAnswerState: (value: Answer) => void;
  onDelete: () => void;
  answersCount: number;
};

export const AnswerEditor: FC<AnswerEditorProps> = ({ answer, setAnswerState, onDelete, answersCount }) => {
  const [error, setError] = useState(false);
  const [grow, setGrow] = useState(true);
  const answerRef = useRef(answer);
  answerRef.current = answer;

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);

  useEffect(() => {
    if (answer.error != null) {
      setTimeout(() => {
        setGrow(false);
      }, 1800);

      setTimeout(() => {
        setAnswerState({ ...answerRef.current, error: null });
        setGrow(true);
      }, 2000);
    }
  }, [answer.value]);

  const deleteAnswer = () => {
    if (answersCount > 2) {
      onDelete();
    } else {
      setError(true);
    }
  };

  return (
    <AnswerContainer deleteError={error || answer.error != null}>
      <Grow in={grow} timeout={500}>
        <ErrorText>
          {answer.error != null && <>{answer.error}</>}
          {error && <>Każde pytanie musi zawierać dwie odpowiedzi!</>}
        </ErrorText>
      </Grow>

      <AnswerBlock className="test">
        <div className="div1">
          <RichTextEditor
            toolbarConfig={toolbarConfig}
            className="text-editor"
            value={answer.value}
            onChange={(value) => setAnswerState({ ...answer, value })}
          />
        </div>
        <div className="div2">
          <input
            type="checkbox"
            checked={answer.isCorrect}
            onChange={() => setAnswerState({ ...answer, isCorrect: !answer.isCorrect })}
          />
          Poprawna
        </div>
        <div className="div3" onClick={deleteAnswer}>
          <div className="div3_1">
            <DeleteForeverIcon className="ico" />
          </div>
          <div className="div3_2">Usuń</div>
        </div>
      </AnswerBlock>
    </AnswerContainer>
  );
};
