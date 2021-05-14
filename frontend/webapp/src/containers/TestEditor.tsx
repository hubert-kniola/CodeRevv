import { FC, useRef, useState } from 'react';

import { EditorState, LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, TestEditorForm } from 'components';

export const TestEditor: FC = () => {
  const [editorState, setEditorState] = useState({ testName: '', questions: [] } as EditorState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  const handleEditorSubmit = () => {
    setLoading(true);
    setError(null);

    if (editorState.questions.length <= 0) {
      setError('Test musi się składać z conajmniej jednego pytania.');
      scrollIntoMessageOverlay(errorRef);
    }

    setLoading(false);
  };

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Błąd" text={error!} noLogo />

      <LoadingOverlay active={loading} text="Czekamy na odpowiedź serwera..." logo>
        <TestEditorForm
          title="Stwórz nowy test"
          buttonText="Zakończ i zapisz"
          onSubmit={handleEditorSubmit}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </LoadingOverlay>
    </>
  );
};
