import { FC, useContext } from 'react';
import { Grid, Checkbox, Avatar } from '@material-ui/core';
import RichTextEditor from 'react-rte';

import { TestFillContext } from 'context';
import { FillContainer, SmallText, AnswerContainer } from './styles';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const QuestionFill: FC = () => {
  const context = useContext(TestFillContext);
  const question = context.getActiveQuestion();

  const isAnswerChecked = (pos: number) => {
    return question.answers[pos].usersVoted && question.answers[pos].usersVoted!.length >= 1;
  };

  return (
    <>
      <hr />
      <FillContainer>
        <div>
          <RichTextEditor value={RichTextEditor.createValueFromString(question.content, 'html')} readOnly />

          <Grid alignItems="center" container spacing={1}>
            <Grid item xs={10} />
            <Grid item xs={2}>
              <SmallText>{question.maxScore} pkt</SmallText>
            </Grid>
          </Grid>

          <AnswerContainer>
            <Grid alignItems="center" container spacing={1}>
              {question.questionType === 'closed' &&
                question.answers.map((a, i) => (
                  <>
                    <Grid item xs={2}>
                      <Checkbox
                        checked={isAnswerChecked(i)}
                        onChange={() => context.toggleAnswerForActiveQuestion(i)}
                        icon={<Avatar style={{ backgroundColor: 'grey', color: 'black' }}>{LETTERS[i]}</Avatar>}
                        checkedIcon={
                          <Avatar style={{ backgroundColor: 'orange', color: 'black' }}>{LETTERS[i]}</Avatar>
                        }
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <RichTextEditor value={RichTextEditor.createValueFromString(a.content, 'html')} readOnly />
                    </Grid>
                  </>
                ))}
            </Grid>
          </AnswerContainer>
        </div>
      </FillContainer>
      <hr />
    </>
  );
};
