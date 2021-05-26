import { FC } from 'react';

import { TestDetails, QuestionMenu, QuestionFill, TestFillButtonGroup, QuestionFillContainer } from 'components';

type Props = {
  onSubmit: () => void;
};

export const TestFillForm: FC<Props> = ({ onSubmit }) => {
  return (
    <QuestionFillContainer>
      <TestDetails />

      <QuestionMenu />

      <QuestionFill />

      <TestFillButtonGroup onSubmit={onSubmit} />
    </QuestionFillContainer>
  );
};
