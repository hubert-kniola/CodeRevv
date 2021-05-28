import { FC, useContext, useState, useEffect, useRef, MutableRefObject } from 'react';
import { Grid, Checkbox, Avatar, Fade } from '@material-ui/core';
import RichTextEditor from 'react-rte';

import { TestFillContext } from 'context';
import { FillContainer, SmallText, AnswerContainer } from './styles';
import { useTransState } from 'hooks';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const QuestionFill: FC = () => {
  const context = useContext(TestFillContext);
  const [qRef, trans, doTrans] = useTransState(context.getActiveQuestion(), true);

  useEffect(() => {
    doTrans();
  }, [context.activeIndex]);

  const isAnswerChecked = (pos: number) => {
    return qRef.current.answers[pos].usersVoted && qRef.current.answers[pos].usersVoted!.length >= 1;
  };

  return (
    <>
      <hr />
      <FillContainer>
        <Fade in={trans} appear>
          <div>
            <RichTextEditor value={RichTextEditor.createValueFromString(qRef.current.content, 'html')} readOnly />

            <Grid alignItems="center" container spacing={1}>
              <Grid item xs={10} />
              <Grid item xs={2}>
                <SmallText>{qRef.current.maxScore} pkt</SmallText>
              </Grid>
            </Grid>

            <AnswerContainer>
              <Grid alignItems="center" container spacing={1}>
                {qRef.current.questionType === 'closed' &&
                  qRef.current.answers.map((a, i) => (
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
          </div>
        </Fade>
      </FillContainer>
      <hr />
    </>
  );
};
