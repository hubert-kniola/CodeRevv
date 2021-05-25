import { FC, useEffect, useState, MouseEvent, useContext, useRef } from 'react';
import RichTextEditor from 'react-rte';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { QuestionContainer, GeneralQuestion, Button, AnswerBlock, AnswerContainer, ErrorText } from './style';

import { EditorQuestion, EditorAnswer, newAnswer, TestEditorContext } from 'context';
import { MessageOverlay } from 'components';
import { toolbarConfig } from 'const';

type QuestionEditorProps = {
  index: number;
  question: EditorQuestion;
  onDelete: () => void;
};

export const QuestionEditor: FC<QuestionEditorProps> = ({ index, question, onDelete }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [grow, setGrow] = useState(true);
  const [open, setOpen] = useState(true);
  const { questions, setSingleQuestion } = useContext(TestEditorContext);

  const questionRef = useRef(question);
  questionRef.current = question;

  const replaceAnswer = (pos: number, value: EditorAnswer) => {
    setSingleQuestion(
      {
        ...question,
        answers: [...question.answers!.slice(0, pos), value, ...question.answers!.slice(pos + 1)],
      },
      index
    );
  };

  const removeAnswer = (pos: number) => {
    if (question.answers!.length > 2) {
      setSingleQuestion(
        {
          ...question,
          answers: question.answers!.filter((_, index) => index !== pos),
        },
        index
      );
      setButtonDisabled(false);
    }
  };

  const addAnswer = (e: MouseEvent) => {
    e.preventDefault();

    if (question.answers!.length < 10) {
      setSingleQuestion(
        {
          ...question,
          answers: [...question.answers!, newAnswer()],
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

  const addPoint = () => {
    if (question.maxScore < 10) {
      setSingleQuestion({ ...question, maxScore: question.maxScore + 0.5 }, index);
    }
  };

  const removePoint = () => {
    if (question.maxScore > 1) {
      setSingleQuestion({ ...question, maxScore: question.maxScore - 0.5 }, index);
    }
  };

  const showQuestionDetails = () => setOpen((open) => !open);

  return (
    <QuestionContainer error={question.error != null}>
      <GeneralQuestion open={open}>
        <ExpandMoreIcon id="ExpandMoreIcon" className="ico" onClick={showQuestionDetails} />
        <div className="test">
          <MessageOverlay
            className="deleteOverlay"
            active={question.lock}
            text={
              questions.length > 1
                ? 'Na pewno chcesz usunąć pytanie? Aby potwierdzić kliknij ponownie na krzyżyk.'
                : 'Test musi zawierać przynajmniej jedno pytanie!'
            }
            noLogo
          >
            <label>Pytanie {index + 1}: </label>
            <h3>
              {question.value
                .toString('html')
                .replace(/(<([^>]+)>)/gi, '')
                .replace(/&nbsp;/g, ' ')
                .trimRight()
                .slice(0, 50) + '...'}
            </h3>
          </MessageOverlay>
        </div>

        <AddIcon id="AddIcon" className="ico" onClick={addPoint} />
        <input value={question.maxScore} />

        <RemoveIcon id="RemoveIcon" className="ico" onClick={removePoint} />
        <ClearIcon id="ClearIcon" className="ico" onClick={onDelete} />
      </GeneralQuestion>

      <Collapse in={open} timeout={500}>
        <Grow in={grow} timeout={500}>
          <ErrorText>{question.error}</ErrorText>
        </Grow>

        <RichTextEditor
          toolbarConfig={toolbarConfig}
          className="text-editor"
          value={question.value}
          onChange={(value) => setSingleQuestion({ ...question, value }, index)}
        />

        {question.answers!.map((item, index) => (
          <AnswerEditor
            key={item.id}
            answer={item}
            setAnswerState={(state) => replaceAnswer(index, state)}
            onDelete={() => removeAnswer(index)}
            answersCount={question.answers!.length}
          />
        ))}
        {buttonDisabled && (
          <p>
            Każde pytanie może mieć tylko 10 odpowiedzi <HighlightOffIcon className="icon" />{' '}
          </p>
        )}

        <Button onClick={addAnswer} disabled={buttonDisabled}>
          Dodaj odpowiedź
        </Button>
      </Collapse>
    </QuestionContainer>
  );
};

type AnswerEditorProps = {
  answer: EditorAnswer;
  setAnswerState: (value: EditorAnswer) => void;
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
