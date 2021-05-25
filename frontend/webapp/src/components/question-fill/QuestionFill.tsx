import { FC } from 'react';

import { Question, Test } from 'const';

type QFProps = {
  question: Question;
};

export const QuestionFill: FC<QFProps> = () => <></>;

type TDProps = {
  test: Test;
};

export const TestDetails: FC<TDProps> = () => <></>;

type QCProps = {
  active: boolean;
  index: number;
  question: Question;
  onClick: () => void;
};

export const QuestionChooser: FC<QCProps> = () => <></>;

type TFBGProps = {
  onSubmit: () => void;
  onOptionClick: (next: boolean) => void;
};

export const TestFillButtonGroup: FC<TFBGProps> = () => <></>;
