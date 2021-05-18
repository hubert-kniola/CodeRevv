import { FC, useState } from 'react';
import { Question, Button, AnswerBlock, AnswerConteiner } from './style';
import RichTextEditor, { EditorValue } from 'react-rte';
import { nanoid } from 'nanoid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

type Answer = {
  id: string;
  value: EditorValue;
  isCorrect: boolean;
  deleteError: boolean;
};

const newAnswerEditor = () =>
  ({
    id: nanoid(),
    value: RichTextEditor.createEmptyValue(),
    isCorrect: false,
  } as Answer);

type QuestionEditorProps = {
  questionNo: number;
};

export const QuestionEditor: FC<QuestionEditorProps> = ({ questionNo }) => {
  const [question, setQuestion] = useState(RichTextEditor.createEmptyValue());
  const [answers, setAnswers] = useState([newAnswerEditor(), newAnswerEditor()] as Answer[]);

  const replaceAnswer = (pos: number, value: Answer) => {
    setAnswers([...answers.slice(0, pos), value, ...answers.slice(pos + 1)]);
  };

  const removeAnswer = (pos: number) => {
    if (answers.length > 2) {
      setAnswers(answers.filter((_, index) => index !== pos));
    } else {
      const answer = answers[pos];
      answer.deleteError = true;
      replaceAnswer(pos, answer);
    }
  };

  const newAnswer = () => {
    setAnswers([...answers, newAnswerEditor()]);
  };

  return (
    <Question>
      <label>Pytanie #{questionNo}: </label>
      <RichTextEditor className="text-editor" value={question} onChange={setQuestion} />

      {answers.map((item, index) => (
        <AnswerEditor
          key={item.id}
          answerState={item}
          setAnswerState={(state) => replaceAnswer(index, state)}
          onDelete={() => removeAnswer(index)}
        />
      ))}

      <Button onClick={newAnswer}>Dodaj odpowiedź</Button>
    </Question>
  );
};

type AnswerEditorProps = {
  answerState: Answer;
  setAnswerState: (value: Answer) => void;
  onDelete: () => void;
};

export const AnswerEditor: FC<AnswerEditorProps> = ({ answerState, setAnswerState, onDelete }) => {
  const resetError = () => {
    if (answerState.deleteError) {
      setAnswerState({ ...answerState, deleteError: !answerState.deleteError });
    }
  };
  return (
    <AnswerConteiner deleteError={answerState.deleteError}>
      <AnswerBlock>
        <div className="div1">
          <RichTextEditor
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
        <div className="div3" onClick={onDelete}>
          <div className="div3_1">
            <DeleteForeverIcon className="ico" />
          </div>
          <div className="div3_2">Usuń</div>
        </div>
      </AnswerBlock>
      {answerState.deleteError && (
        <p onClick={resetError}>
          Każde pytanie musi zawierać dwie odpowiedzi!
          <HighlightOffIcon />
        </p>
      )}
    </AnswerConteiner>
  );
};
