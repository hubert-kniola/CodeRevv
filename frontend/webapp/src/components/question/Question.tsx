import { FC, useEffect, useState } from 'react';
import { Question, Button, AnswerBlock, AnswerConteiner } from './style';
import RichTextEditor, { EditorValue, ToolbarConfig,  } from 'react-rte';
import { nanoid } from 'nanoid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { toolbarConfig } from 'const'


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



export const QuestionEditor: FC<QuestionEditorProps> = ({ questionNo }) => {
  const [question, setQuestion] = useState(RichTextEditor.createEmptyValue());
  const [answers, setAnswers] = useState([newAnswerEditor(), newAnswerEditor()] as Answer[]);
  const [buttonDisabled, setButtonDisabled] = useState(false as boolean);
  
  const replaceAnswer = (pos: number, value: Answer) => {
    setAnswers( answers => [...answers.slice(0, pos), value, ...answers.slice(pos + 1)]);
  };

  const removeAnswer = (pos: number) => {
    if (answers.length > 2 ) {
      setAnswers(answers => answers.filter((_, index) => index !== pos));
    } else {
      const answer = {...answers[pos]}
      replaceAnswer(pos, { ...answer, deleteError: true });
    }
  };

  const newAnswer = () => {
    if (answers.length < 10) {
      setAnswers(answers =>[...answers, newAnswerEditor()]);
    }

    if ([...answers].length === 10) {
      setButtonDisabled(true);
    }
  };

  return (
    <Question>
      <label>Pytanie #{questionNo}: </label>
      <RichTextEditor toolbarConfig = {toolbarConfig} className="text-editor" value={question} onChange={setQuestion} />

      {answers.map((item, index) => (
        <AnswerEditor
          key={item.id}
          answerState={item}
          setAnswerState={(state) => replaceAnswer(index, state)}
          onDelete={() => removeAnswer(index)}
          answersCount = {answers.length}
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
  answersCount: number
};

export const AnswerEditor: FC<AnswerEditorProps> = ({ answerState, setAnswerState, onDelete, answersCount  }) => {
  const[deleteError, setDeleteError] = useState(false)


  useEffect(() =>{
    if(deleteError){
        setTimeout(() => {
          setDeleteError(false)
      }
    ,2000);}
  }, [deleteError])


  const DeleteAnswer = () =>{
    if(answersCount > 2){
      onDelete();
    }
    else{
      setDeleteError(true);
    }
  }


  return (
    <AnswerConteiner deleteError={deleteError} >
      <AnswerBlock className="test">
        <div className="div1">
          <RichTextEditor
            toolbarConfig = {toolbarConfig}
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
    </AnswerConteiner>
  );
};
