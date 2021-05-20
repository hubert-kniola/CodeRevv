import { FC, useRef, useState, useContext } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, TestEditorForm } from 'components';
import { TestEditorContext, TestEditorContextProvider } from 'context';

const TestEditorIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const testEditorContext = useContext(TestEditorContext);
  const errorRef = useRef<HTMLDivElement>(null);

  const handleEditorSubmit = () => {
    setLoading(true);
    setError(null);

    setLoading(false);
  };

  return (
    <TestEditorContextProvider>
      <MessageOverlay ref={errorRef} active={error != null} title="Błąd" text={error!} noLogo />

      <LoadingOverlay active={loading} text="Czekamy na odpowiedź serwera..." logo>
        <TestEditorForm title="Stwórz nowy test" buttonText="Zakończ i zapisz" onSubmit={handleEditorSubmit} />
      </LoadingOverlay>
    </TestEditorContextProvider>
  );
};

export const TestEditor: FC = () => (
  <TestEditorContextProvider>
    <TestEditorIn />
  </TestEditorContextProvider>
);
