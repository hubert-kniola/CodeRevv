import { FC, useState } from 'react';

import { TestDetails, QuestionChooser, ClosedQuestionFill, TestFillButtonGroup, QuestionFillContainer } from 'components';
import { Answer, Question, Test } from 'const';
import { Grid } from '@material-ui/core';

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

  const toggleAnswer = (answerIndex: number) => {
    let voted = [] as number[];

    // MARKING
    let usersVotedLen = test.questions[activeIndex].answers[answerIndex].usersVoted?.length;
    if (usersVotedLen != null && usersVotedLen > 0) {
      voted = [];
    } else {
      voted = [1];
    }

    setTest({
      ...test,
      questions: [
        ...test.questions.slice(0, activeIndex),
        {
          ...test.questions[activeIndex],
          answers: test.questions[activeIndex].answers.map((a, i) => {
            if (i == answerIndex) {
              return { ...a, usersVoted: voted };
            } else {
              return a;
            }
          }),
        },
        ...test.questions.slice(activeIndex + 1),
      ],
    } as Test);
  };

  return (
    <QuestionFillContainer>
      <TestDetails test={test} />

      <Grid container spacing={2}>
        {test.questions.map((q, i) => (
          <Grid item xs={4} md={3}>
            <QuestionChooser
              key={q.index}
              active={activeIndex === i}
              index={i}
              question={q}
              onClick={() => switchQuestion(i)}
            />
          </Grid>
        ))}
      </Grid>

      <ClosedQuestionFill question={test.questions[activeIndex]} toggleVote={toggleAnswer} />

      <TestFillButtonGroup
        onSubmit={onSubmit}
        onOptionClick={(next) => switchQuestion(activeIndex + (next ? 1 : -1))}
      />
    </QuestionFillContainer>
  );
};
