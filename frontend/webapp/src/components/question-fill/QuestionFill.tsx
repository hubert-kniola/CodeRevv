import { FC } from 'react';
import { Grid, Checkbox, Avatar } from '@material-ui/core';
import RichTextEditor from 'react-rte';

import { Question, Test } from 'const';
import {
  BigText,
  Container,
  HeaderContainer,
  SmallText,
  ChooserContainer,
  MainButton,
  MinorButton,
  FillContainer,
  ChooserText,
  AnswerContainer,
} from './styles';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

type TDProps = {
  test: Test;
};

export const TestDetails: FC<TDProps> = ({ test }) => (
  <HeaderContainer>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BigText>
          <strong>{test.testName}</strong>
        </BigText>
      </Grid>
      <Grid item xs={12}>
        <SmallText>
          Stworzony przez użytkownika <strong>{test.creatorId}</strong>
        </SmallText>
      </Grid>
    </Grid>

    <hr />
  </HeaderContainer>
);

type QCProps = {
  active: boolean;
  index: number;
  question: Question;
  onClick: () => void;
};

export const QuestionChooser: FC<QCProps> = ({ active, index, question, onClick }) => (
  <ChooserContainer active={active} onClick={onClick}>
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

type QFProps = {
  question: Question;
  toggleVote: (answer: number) => void;
};

export const QuestionFill: FC<QFProps> = ({ question, toggleVote }) => {
  const isAnswerChecked = (pos: number) => {
    return question.answers[pos].usersVoted && question.answers[pos].usersVoted!.length >= 1;
  };

  return (
    <>
      <hr />
      <FillContainer>
        <RichTextEditor value={RichTextEditor.createValueFromString(question.content, 'html')} readOnly />

        <Grid alignItems="center" container spacing={1}>
          <Grid item xs={10} />
          <Grid item xs={2}>
            <SmallText>{question.maxScore} pkt</SmallText>
          </Grid>
        </Grid>

        <AnswerContainer>
          <Grid alignItems="center" container spacing={1}>
            {question.questionType === 'closed' && question.answers.map((a, i) => (
                <>
                  <Grid item xs={2}>
                    <Checkbox
                      checked={isAnswerChecked(i)}
                      onChange={() => toggleVote(i)}
                      icon={<Avatar style={{ backgroundColor: 'grey' }}>{LETTERS[i]}</Avatar>}
                      checkedIcon={<Avatar style={{ backgroundColor: 'green' }}>{LETTERS[i]}</Avatar>}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <RichTextEditor value={RichTextEditor.createValueFromString(a.content, 'html')} readOnly />
                  </Grid>
                </>
              ))}
          </Grid>
        </AnswerContainer>
      </FillContainer>
      <hr />
    </>
  );
};

type TFBGProps = {
  onSubmit: () => void;
  onOptionClick: (next: boolean) => void;
};

export const TestFillButtonGroup: FC<TFBGProps> = ({ onOptionClick, onSubmit }) => (
  <>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainButton onClick={() => onOptionClick(false)}>Poprzednie pytanie</MainButton>
      </Grid>
      <Grid item xs={6}>
        <MainButton onClick={() => onOptionClick(true)}>Następne pytanie</MainButton>
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

export const QuestionFillContainer: FC = ({ children }) => <Container>{children}</Container>;
