import { FC, useState } from 'react';
import { TempContainer, Editor, Option } from './style';
import RichTextEditor, { EditorValue } from 'react-rte';
import { amber } from '@material-ui/core/colors';
import { type } from 'node:os';

//#region TextEditor
type TextEditorProps = {
  value: EditorValue;
  setValue: (value: EditorValue) => void;
};

export const TextEditor: FC<EditorValue> = ({value}) => {
  const [value, setValue] = useState<EditorValue>(RichTextEditor.createEmptyValue());
  const Change = (value: EditorValue) => {
    setValue(value);
    console.log(value);
  };
  return <RichTextEditor value={value} onChange={(value) => Change(value)} />;
};
//#endregion

type AnswerType = {
  value: EditorValue;
  onChange: (value: EditorValue) => void;
};

const Answer


export const QuestionTest: FC = () => {
  const [answers, setAnswers] = useState([] as EditorValue[]);



  return (
    <TempContainer>
      <Editor>
        <TextEditor />
      </Editor>
      <button> ADD </button>
      {answers.map((item) => {
        return <RichTextEditor value={item.value} onChange={item.onChange} />;
      })}
    </TempContainer>
  );
};
