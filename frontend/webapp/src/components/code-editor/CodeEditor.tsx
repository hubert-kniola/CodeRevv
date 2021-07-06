import { FC, useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

import { MonacoFixer } from './styles';
import { CodeCellContext, ThemeContext } from 'context';

export const CodeEditor: FC = () => {
  const { language, code, updateCode } = useContext(CodeCellContext);
  const { theme } = useContext(ThemeContext);

  const editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
    editor.focus();
  };

  const onChange = (newValue: string, e: monacoEditor.editor.IModelContentChangedEvent) => {
    updateCode(newValue);
  };

  return (
    <MonacoFixer>
      <MonacoEditor
        onChange={onChange}
        editorDidMount={editorDidMount}
        language={language}
        theme={theme.monacoTheme}
        height="600"
        value={code}
        options={{ selectOnLineNumbers: true, fontSize: 18 }}
      />
    </MonacoFixer>
  );
};
