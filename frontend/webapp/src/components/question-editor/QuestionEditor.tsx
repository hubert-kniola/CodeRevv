import { FC, useEffect, useState, MouseEvent, useContext, useRef } from 'react';
import RichTextEditor from 'react-rte';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { CSSTransition } from 'react-transition-group';

import {
  QuestionContainer,
  Container,
  GeneralQuestion,
  Button,
  AnswerBlock,
  AnswerContainer,
  ErrorText,
} from './style';

import { Draggable } from 'react-beautiful-dnd';
import { EditorQuestion, EditorAnswer, newAnswer, TestEditorContext } from 'context';
import { CustomCheckbox, MessageOverlay } from 'components';
import { toolbarConfig } from 'const';
import { Grid } from '@material-ui/core';

export const questionPreview = (question: EditorQuestion, length=50): string =>
  question.value
    .toString('html')
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/&nbsp;/g, ' ')
    .trimRight()
    .slice(0, length) + '...';

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
    <CSSTransition key={question.id} timeout={200} classNames="move">
      <Container>
        <Draggable draggableId={question.id} index={index}>
          {(provided, snapshot) => (
            <QuestionContainer
              isDragging={snapshot.isDragging}
              error={question.error != null}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <GeneralQuestion open={open}>
                <ExpandMoreIcon id="ExpandMoreIcon" className="ico" onClick={showQuestionDetails} />
                <div className="test">
                  <MessageOverlay
                    className="deleteOverlay"
                    active={question.lock}
                    noLogo
                    text={
                      questions.length > 1
                        ? 'Na pewno chcesz usunąć pytanie? Aby potwierdzić kliknij ponownie na krzyżyk.'
                        : 'Test musi zawierać przynajmniej jedno pytanie!'
                    }
                  >
                    <label>Pytanie {index + 1}: </label>
                    <h3>{questionPreview(question)}</h3>
                  </MessageOverlay>
                </div>

                <AddIcon id="AddIcon" className="ico" onClick={addPoint} />
                <input
                  value={question.maxScore}
                  min={0}
                  max={10}
                  step={0.5}
                  onChange={(e) => {
                    const val = +e.target.value;
                    if (val <= 10 && val >= 0.5) {
                      setSingleQuestion({ ...question, maxScore: +e.target.value }, index);
                    }
                  }}
                />

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
                    number={index + 1}
                  />
                ))}
                <Collapse in={buttonDisabled}>
                  <p>Każde pytanie może mieć tylko 10 odpowiedzi.</p>
                </Collapse>

                <Button onClick={addAnswer} disabled={buttonDisabled}>
                  Dodaj odpowiedź
                </Button>
              </Collapse>
            </QuestionContainer>
          )}
        </Draggable>
      </Container>
    </CSSTransition>
  );
};

type AnswerEditorProps = {
  answer: EditorAnswer;
  setAnswerState: (value: EditorAnswer) => void;
  onDelete: () => void;
  answersCount: number;
  number: number;
};

export const AnswerEditor: FC<AnswerEditorProps> = ({ answer, setAnswerState, onDelete, answersCount, number }) => {
  const [deleteError, setDeleteError] = useState(false);
  const [answerError, setAnswerError] = useState<string | null>(null);

  useEffect(() => {
    if (answerError === null) {
      setAnswerError(answer.error);
    }
  }, [answer]);

  useEffect(() => {
    if (deleteError) {
      setTimeout(() => {
        setDeleteError(false);
      }, 2000);
    }
  }, [deleteError]);

  useEffect(() => {
    if (answerError != null) {
      setAnswerState({ ...answer, error: null });

      setTimeout(() => {
        setAnswerError(null);
      }, 2000);
    }
  }, [answer.value]);

  const deleteAnswer = () => {
    if (answersCount > 2) {
      onDelete();
    } else {
      setDeleteError(true);
    }
  };

  return (
    <AnswerContainer deleteError={deleteError || answerError !== null}>
      <label>Odpowiedź {number}:</label>
      <Collapse in={answer.error !== null}>
        <ErrorText>
          <>{answerError}</>
        </ErrorText>
      </Collapse>

      <Collapse in={deleteError}>
        <ErrorText>Każde pytanie musi zawierać dwie odpowiedzi!</ErrorText>
      </Collapse>

      <AnswerBlock className="test">
        <Grid container>
          <Grid item xs={10}>
            <RichTextEditor
              toolbarConfig={toolbarConfig}
              className="text-editor"
              value={answer.value}
              onChange={(value) => setAnswerState({ ...answer, value })}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomCheckbox
              id="checkid"
              checked={answer.isCorrect}
              onClick={() => setAnswerState({ ...answer, isCorrect: !answer.isCorrect })}
            />
            <div className="div2">Poprawna</div>
            <div className="div3" onClick={deleteAnswer}>
              <DeleteForeverIcon className="ico" />
              <div className="div3_2">Usuń</div>
            </div>
          </Grid>
        </Grid>
      </AnswerBlock>
    </AnswerContainer>
  );
};
