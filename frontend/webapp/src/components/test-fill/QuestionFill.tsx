import { FC, useContext, useState, useEffect } from 'react';
import { Grid, Checkbox, Avatar } from '@material-ui/core';
import RichTextEditor from 'react-rte';

import { FillContainer, SmallText, AnswerContainer } from './styles';
import { TestFillContext } from 'context';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const QuestionFill: FC = () => {
  const context = useContext(TestFillContext);
  const [question, setQuestion] = useState(context.getActiveQuestion());

  useEffect(() => {
    setQuestion(context.getActiveQuestion());
  }, [context.activeIndex]);

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
            {question.questionType === 'closed' &&
              question.answers.map((a, i) => (
                <>
                  <Grid item xs={2}>
                    <Checkbox
                      checked={isAnswerChecked(i)}
                      onChange={() => context.toggleAnswerForActiveQuestion(i)}
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
