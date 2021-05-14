import { FC } from 'react';

import { EditorForm } from 'components';

export const TestEditor: FC = () => {
  const handleEditorSubmit = console.log;

  return <EditorForm onSubmit={handleEditorSubmit}></EditorForm>;
};
