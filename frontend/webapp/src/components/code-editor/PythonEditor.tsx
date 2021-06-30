import { FC, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

import { LoadingOverlay } from 'components';

const API_URL = '18.220.31.50';
const JUDGE_URL = `http://${API_URL}:2358`;
const LANG_ID = 71;

type Props = {
  text: string;
};

export const PythonEditor: FC<Props> = ({ text }) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('# test');

  const callJudge = async () => {
    setLoading(true);

    try {
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };
  const onChange = (newValue: string, e: monacoEditor.editor.IModelContentChangedEvent) => {
    console.log('onChange', newValue, e);
    setCode((_) => newValue);
  };
  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <LoadingOverlay active={loading} text={text}>
      <MonacoEditor
        language="python"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </LoadingOverlay>
  );
};
