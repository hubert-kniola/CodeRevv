import { createContext, useState, FC } from 'react';
import { apiAxios } from 'utility';

export interface ICodeCellContext {
  language: string;
  code: string;
  consoleOutput: string;
  loading: boolean;
  error: boolean;

  updateCode: (x: string) => void;
  runCode: () => Promise<void>;
}

export const CodeCellContext = createContext({} as ICodeCellContext);

type Props = {
  language: string;
};

type LanguageDependentConstants = {
  code: string;
  console: string;
  endpoint: string;
};

type LanguagePlaceholders = {
  [lang: string]: LanguageDependentConstants;
};

const PLACEHOLDERS: LanguagePlaceholders = {
  python: {
    code: '# Tu wpisz swój kod',
    console: 'Po uruchomieniu pojawi się tutaj wynik działania programu',
    endpoint: 'python',
  },
};

export const CodeCellContextProvider: FC<Props> = ({ children, language }) => {
  const [code, setCode] = useState(PLACEHOLDERS[language].code);
  const [consoleOutput, setConsoleOutput] = useState(PLACEHOLDERS[language].console);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateCode = (text: string) => setCode((_) => text);

  const runCode = async () => {
    setLoading((_) => true);
    setError((_) => false);

    try {
      const { data } = await apiAxios.post(`/r/${PLACEHOLDERS[language].endpoint}/`, { code });
      console.log({ returned: data });

      const { output, success } = data;

      if (!success) {
        setError((_) => true);
      }

      setConsoleOutput((_) => output);

    } catch (err) {
      console.log({ error: err });
      setError((_) => true);
      setConsoleOutput((_) => 'ERRR');
    }

    setLoading((_) => false);
  };

  return (
    <CodeCellContext.Provider value={{ language, code, consoleOutput, loading, error, updateCode, runCode }}>
      {children}
    </CodeCellContext.Provider>
  );
};
