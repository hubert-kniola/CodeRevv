import { FC, useState } from 'react';
import RichTextEditor from 'react-rte';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { CSSTransition } from 'react-transition-group';

import { QuestionContainer, Container, GeneralQuestion, AnswerBlock, AnswerContainer, PreviewText } from './style';

import { Draggable } from 'react-beautiful-dnd';
import { EditorQuestion, EditorAnswer } from 'context';
import { CustomCheckbox } from 'components';
import { toolbarConfig } from 'const';
import { Collapse, Grid } from '@material-ui/core';

import { questionPreview } from './QuestionEditor';

type QuestionViewerProps = {
  index: number;
  question: EditorQuestion;
};

export const QuestionViewer: FC<QuestionViewerProps> = ({ index, question }) => {
  const [open, setOpen] = useState(false);

  const showQuestionDetails = () => setOpen((open) => !open);

  return (
    <CSSTransition key={question.id} timeout={200} classNames="move">
      <Container>
        <Draggable draggableId={question.id} index={index}>
          {(provided, snapshot) => (
            <QuestionContainer
              isDragging={snapshot.isDragging}
              error={question.error != null}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <GeneralQuestion open={open}>
                <ExpandMoreIcon id="ExpandMoreIcon" className="ico" onClick={showQuestionDetails} />
                <PreviewText>{questionPreview(question, 300)}</PreviewText>

                <input value={question.maxScore} min={0} max={10} disabled />
              </GeneralQuestion>

              <Collapse in={open} timeout={500}>
                <RichTextEditor toolbarConfig={toolbarConfig} className="text-editor" value={question.value} readOnly />

                {question.answers!.map((item) => (
                  <AnswerViewer key={item.id} answer={item} />
                ))}
              </Collapse>
            </QuestionContainer>
          )}
        </Draggable>
      </Container>
    </CSSTransition>
  );
};

type AnswerViewerProps = {
  answer: EditorAnswer;
};

export const AnswerViewer: FC<AnswerViewerProps> = ({ answer }) => (
  <AnswerContainer deleteError={false}>
    <AnswerBlock className="test">
      <Grid container>
        <Grid item xs={10}>
          <RichTextEditor toolbarConfig={toolbarConfig} className="text-editor" value={answer.value} disabled />
        </Grid>
        <Grid item xs={2}>
          <CustomCheckbox id="checkid" checked={answer.isCorrect} disabled />
          <div className="div2">Poprawna</div>
        </Grid>
      </Grid>
    </AnswerBlock>
  </AnswerContainer>
);
