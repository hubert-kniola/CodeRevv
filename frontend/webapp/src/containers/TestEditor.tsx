import { FC, useState } from 'react';

import { EditorState, TestEditorForm } from 'components';

export const TestEditor: FC = () => {
  const [editorState, setEditorState] = useState({ testName: '', questions: [] } as EditorState);

  const handleEditorSubmit = (data: any) => console.log({ data, editorState });

  return (
    <TestEditorForm
      title="Stwórz nowy test"
      buttonText="Zakończ i zapisz"
      onSubmit={handleEditorSubmit}
      editorState={editorState}
      setEditorState={setEditorState}
    />
  );
};
