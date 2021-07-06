import { CodeCellContext, ThemeContext } from 'context';
import { useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { MonacoFixer } from './styles';

export const OutputConsole = () => {
  const { language, consoleOutput } = useContext(CodeCellContext);
  const { theme } = useContext(ThemeContext);

  return (
    <MonacoFixer>
      <MonacoEditor
        language={language}
        theme={theme.monacoTheme}
        height="300"
        value={consoleOutput}
        options={{
          selectOnLineNumbers: true,
          readOnly: true,
          lineNumbers: 'off',
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          minimap: { enabled: false },
          contextmenu: false,
          fontSize: 16,
        }}
      />
    </MonacoFixer>
  );
};
