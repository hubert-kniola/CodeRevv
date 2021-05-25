import { FC, useState } from 'react';

import { TestDetails, QuestionChooser, QuestionFill, TestFillButtonGroup } from 'components';
import { Test } from 'const';

type Props = {
  test: Test;
  setTest: (t: Test) => void;
  onSubmit: () => void;
};

export const TestFillForm: FC<Props> = ({ test, setTest, onSubmit }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const switchQuestion = (pos: number) => {
    if (pos >= test.questions.length) {
      setActiveIndex((_) => 0);
    } else if (pos < 0) {
      setActiveIndex((_) => test.questions.length - 1);
    } else {
      setActiveIndex((_) => pos);
    }
  };

  return (
    <>
      <TestDetails test={test} />

      {test.questions.map((q, i) => (
        <QuestionChooser
          key={q.index}
          active={activeIndex === i}
          index={i}
          question={q}
          onClick={() => switchQuestion(i)}
        />
      ))}

      <QuestionFill question={test.questions[activeIndex]} />

      <TestFillButtonGroup
        onSubmit={onSubmit}
        onOptionClick={(next) => switchQuestion(activeIndex + (next ? 1 : -1))}
      />
    </>
  );
};
