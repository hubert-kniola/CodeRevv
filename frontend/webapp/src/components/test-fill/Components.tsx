import { FC, useContext } from 'react';
import { Grid } from '@material-ui/core';

import { TestFillContext } from 'context';
import { Question } from 'const';

import { BigText, Container, HeaderContainer, ChooserContainer, MainButton, MinorButton, ChooserText } from './styles';

export const TestDetails: FC = () => {
  const context = useContext(TestFillContext);

  return (
    <HeaderContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BigText>
            <strong>{context.test!.testName}</strong>
          </BigText>
        </Grid>
      </Grid>

      <hr />
    </HeaderContainer>
  );
};

type QCProps = {
  active: boolean;
  index: number;
  question: Question;
  onClick: () => void;
};

export const QuestionChooser: FC<QCProps> = ({ active, index, question, onClick }) => {
  const isFilled = () => question.answers.filter((a) => a.usersVoted?.length).length > 0;

  return (
    <ChooserContainer active={active} filled={isFilled()} onClick={onClick}>
      <div>
        <strong>Pytanie #{index + 1}</strong>
      </div>
      <Grid container spacing={2}>
        <Grid item xs>
          <ChooserText>
            {question.content
              .replace(/(<([^>]+)>)/gi, '')
              .replace(/&nbsp;/g, ' ')
              .trimRight()}
          </ChooserText>
        </Grid>
      </Grid>
    </ChooserContainer>
  );
};

type TFBGProps = {
  onSubmit: () => void;
};

export const TestFillButtonGroup: FC<TFBGProps> = ({ onSubmit }) => {
  const { activeIndex, switchQuestion, test } = useContext(TestFillContext);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <MainButton disabled={activeIndex === 0} onClick={() => switchQuestion(activeIndex - 1)}>
            Poprzednie pytanie
          </MainButton>
        </Grid>
        <Grid item xs={6}>
          <MainButton
            disabled={test!.questions.length - 1 === activeIndex}
            onClick={() => switchQuestion(activeIndex + 1)}
          >
            Następne pytanie
          </MainButton>
        </Grid>
      </Grid>

      <hr />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MinorButton onClick={onSubmit}>Zakończ test i wyjdź</MinorButton>
        </Grid>
      </Grid>
    </>
  );
};

export const QuestionFillContainer: FC = ({ children }) => <Container>{children}</Container>;

export const QuestionMenu: FC = () => {
  const context = useContext(TestFillContext);

  return (
    <Grid container spacing={2}>
      {context.test!.questions.map((q, i) => (
        <Grid item xs={4} md={3}>
          <QuestionChooser
            key={q.index}
            active={context.activeIndex === i}
            index={i}
            question={q}
            onClick={() => context.switchQuestion(i)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
