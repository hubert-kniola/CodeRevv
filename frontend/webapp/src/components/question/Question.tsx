import { FC, useState } from 'react';
import { TempContainer, Editor, Option } from './style';
import RichTextEditor, { EditorValue } from 'react-rte';
import { nanoid } from 'nanoid';

type Answer = {
  id: string;
  value: EditorValue;
  isCorrect: boolean;
};

const newAnswerEditor = () =>
  ({
    id: nanoid(),
    value: RichTextEditor.createEmptyValue(),
    isCorrect: false,
  } as Answer);

export const QuestionEditor: FC = () => {
  const [question, setQuestion] = useState(RichTextEditor.createEmptyValue());
  const [answers, setAnswers] = useState([newAnswerEditor(), newAnswerEditor()] as Answer[]);

  const replaceAnswer = (pos: number, value: Answer) => {
    setAnswers([...answers.slice(0, pos), value, ...answers.slice(pos + 1)]);
  };

  const removeAnswer = (pos: number) => {
    setAnswers(answers.filter((_, index) => index !== pos));
  };

  const newAnswer = () => {
    setAnswers([...answers, newAnswerEditor()]);
  };

  return (
    <TempContainer>
      <RichTextEditor value={question} onChange={setQuestion} />

      {answers.map((item, index) => (
        <AnswerEditor
          key={item.id}
          answerState={item}
          setAnswerState={(state) => replaceAnswer(index, state)}
          onDelete={() => removeAnswer(index)}
        />
      ))}

      <button onClick={newAnswer}>Dodaj pytanie</button>
      <button
        onClick={() => {
          console.log(question.toString('html'));

          answers.forEach((item) => console.log({ correct: item.isCorrect, text: item.value.toString('html') }));
        }}
      >
        Podsumuj w konsoli
      </button>
    </TempContainer>
  );
};

type AnswerEditorProps = {
  answerState: Answer;
  setAnswerState: (value: Answer) => void;
  onDelete: () => void;
};

export const AnswerEditor: FC<AnswerEditorProps> = ({ answerState, setAnswerState, onDelete }) => {
  return (
    <>
      <RichTextEditor value={answerState.value} onChange={(value) => setAnswerState({ ...answerState, value })} />
      <input
        type="checkbox"
        checked={answerState.isCorrect}
        onChange={() => setAnswerState({ ...answerState, isCorrect: !answerState.isCorrect })}
      />
      <button onClick={onDelete}>X</button>
    </>
  );
};
