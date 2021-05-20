import { FC, useRef, useState } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, TestEditorForm } from 'components';
import { TestEditorContextProvider } from 'context';

export const TestEditor: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
