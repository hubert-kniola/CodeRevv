import { FC, useState } from 'react';
import { Question, Button, AnswerBlock, AnswerConteiner } from './style';
import RichTextEditor, { EditorValue, ToolbarConfig } from 'react-rte';
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
    deleteError: false,
  } as Answer);

type QuestionEditorProps = {
  questionNo: number;
};

const toolbarConfig: ToolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
};

export const QuestionEditor: FC<QuestionEditorProps> = ({ questionNo }) => {
  const [question, setQuestion] = useState(RichTextEditor.createEmptyValue());
  const [answers, setAnswers] = useState([newAnswerEditor(), newAnswerEditor()] as Answer[]);
  const [buttonDisabled, setButtonDisabled] = useState(false as boolean);

  const replaceAnswer = (pos: number, value: Answer) => {
    setAnswers([...answers.slice(0, pos), value, ...answers.slice(pos + 1)]);
  };

  const removeAnswer = (pos: number) => {
    if (answers.length > 2 ) {
      setAnswers(answers.filter((_, index) => index !== pos));
    } else {
      const answer = answers[pos];
      replaceAnswer(pos, { ...answer, deleteError: !answer.deleteError });
    }
  };

  const newAnswer = () => {
    if (answers.length < 10) {
      setAnswers([...answers, newAnswerEditor()]);
    }

    if ([...answers].length === 10) {
      setButtonDisabled(true);
    }
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
      <p>
        {buttonDisabled && (
          <>
            Każde pytanie może mieć tylko 10 odpowiedzi <HighlightOffIcon className="icon" />{' '}
          </>
        )}
      </p>
      <Button onClick={newAnswer} disabled={buttonDisabled}>
        Dodaj odpowiedź
      </Button>
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
    <AnswerConteiner deleteError={answerState.deleteError} onClick={resetError}>
      <AnswerBlock className="test">
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
      <p>
        {answerState.deleteError && (
          <>
            Każde pytanie musi zawierać dwie odpowiedzi! <HighlightOffIcon className="icon" />{' '}
          </>
        )}
      </p>
    </AnswerConteiner>
  );
};
