import { FC, useContext } from 'react';
import { LoadingOverlay, CodeEditor } from 'components';
import { Container, RunButton } from './styles';
import { OutputConsole } from './OutputConsole';
import { CodeCellContext, CodeCellContextProvider } from 'context';

type Props = {
  loadingText: string;
};

const CodeCellIn: FC<Props> = ({ loadingText }) => {
  const { loading, error, runCode } = useContext(CodeCellContext);

  return (
    <Container error={error}>
      <LoadingOverlay active={loading} text={loadingText}>
        <CodeEditor />
        <RunButton onClick={runCode}>Uruchom kod</RunButton>
        <OutputConsole />
      </LoadingOverlay>
    </Container>
  );
};

export const CodeCell: FC<Props> = (props) => (
  <CodeCellContextProvider language="python">
    <CodeCellIn {...props} />
  </CodeCellContextProvider>
);
