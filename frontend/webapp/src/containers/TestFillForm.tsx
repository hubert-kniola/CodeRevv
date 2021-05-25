import { FC } from 'react';

import { QuestionFill } from 'components';
import { Test } from 'const';

type Props = {
  test: Test;
  setTest: (t: Test) => void;
  onSubmit: () => void;
  onPartialSubmit: () => void;
};

export const TestFillForm: FC<Props> = ({ test, setTest, onSubmit, onPartialSubmit }) => {
  return (
    <>
      <QuestionFill />
    </>
  );
};
