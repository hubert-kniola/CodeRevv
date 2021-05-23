import { FC, useEffect, useState, MouseEvent, useContext, useRef } from 'react';
import RichTextEditor from 'react-rte';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import Grow from '@material-ui/core/Grow';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {
  QuestionContainer,
  GeneralQuestion,
  QuestionDetails,
  Button,
  AnswerBlock,
  AnswerContainer,
  ErrorText,
} from './style';
import { Question, Answer, newAnswer, TestEditorContext } from 'context';
import { toolbarConfig } from 'const';

type QuestionEditorProps = {
  index: number;
  question: Question;
};

export const QuestionEditor: FC<QuestionEditorProps> = ({ index, question }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [grow, setGrow] = useState(true);
  const [open, setOpen] = useState(false);
  const [questionHeight, setQuestionHeight] = useState(0);
  const [questionHeightDiff, setQuestionHeightDiff] = useState({ change: true, diff: 0, answerCount: 0 });

  const { setSingleQuestion } = useContext(TestEditorContext);
  const questionDetailsRef = useRef<HTMLDivElement>(null);
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

  const AddPoint = () => {
    if (question.maxScore < 10) {
      setSingleQuestion({ ...question, maxScore: question.maxScore + 0.5 }, index);
    }
  };

  const RemovePoint = () => {
    if (question.maxScore > 1) {
      setSingleQuestion({ ...question, maxScore: question.maxScore - 0.5 }, index);
    }
  };

  const ShowQuestionDetails = () => {
    setOpen((open) => !open);

    if (open) {
      setQuestionHeight(questionDetailsRef.current!.scrollHeight);
    } else {
      setQuestionHeight(0);
    }
  };

  const DefaultHeightDiff = () => {
    setQuestionHeightDiff({
      change: false,
      diff: questionHeightDiff.diff,
      answerCount: questionRef.current.answers.length,
    });
  }

  useEffect(() => {
    if (questionRef.current.answers.length > questionHeightDiff.answerCount) {
      setQuestionHeight(questionDetailsRef.current!.scrollHeight);

      if (questionHeightDiff.change && questionHeightDiff.diff === 0) {
        setQuestionHeightDiff({
          change: true,
          diff: questionDetailsRef.current!.scrollHeight,
          answerCount: questionRef.current.answers.length,
        });
      } else if (questionHeightDiff.change) {
        setQuestionHeightDiff({
          change: false,
          diff: questionDetailsRef.current!.scrollHeight - questionHeightDiff.diff,
          answerCount: questionRef.current.answers.length,
        });
      } else {
        DefaultHeightDiff()
      }
    } else {
      setQuestionHeight(questionDetailsRef.current!.scrollHeight - questionHeightDiff.diff);
      DefaultHeightDiff()
    }
  }, [questionRef.current.answers.length]);


  return (
    <QuestionContainer error={question.error != null}>
      <GeneralQuestion>
        <ExpandMoreIcon id="ExpandMoreIcon" className="ico" onClick={ShowQuestionDetails} />
        <div className="test">
          <label>Pytanie {index + 1}: </label>
          <h3>
            {question.value
              .toString('html')
              .slice(0, 50)
              .replace(/(<([^>]+)>)/gi, '')
              .replace(/&nbsp;/g, ' ') + '...'}
          </h3>
        </div>
        <AddIcon id="AddIcon" className="ico" onClick={AddPoint} />
        <input value={question.maxScore} />
        <RemoveIcon id="RemoveIcon" className="ico" onClick={RemovePoint} />
        <ClearIcon id="ClearIcon" className="ico" />
      </GeneralQuestion>

      <QuestionDetails height={questionHeight} ref={questionDetailsRef}>
        <Grow in={grow} timeout={500}>
          <ErrorText>{question.error}</ErrorText>
        </Grow>
        <RichTextEditor
          toolbarConfig={toolbarConfig}
          className="text-editor"
          value={question.value}
          onChange={(value) => setSingleQuestion({ ...question, value }, index)}
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
        { buttonDisabled && <p>Każde pytanie może mieć tylko 10 odpowiedzi <HighlightOffIcon className="icon" />{' '}</p>}

        <Button onClick={addAnswer} disabled={buttonDisabled}>
          Dodaj odpowiedź
        </Button>
      </QuestionDetails>
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
