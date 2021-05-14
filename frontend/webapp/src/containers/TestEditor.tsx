import { FC } from 'react';

import { EditorForm } from 'components';

export const TestEditor: FC = () => {
  const handleEditorSubmit = () => {};

  return <EditorForm onSubmit={handleEditorSubmit}></EditorForm>;
};
