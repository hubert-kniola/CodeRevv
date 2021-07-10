import { FC, useContext } from 'react';
import RichTextEditor from 'react-rte';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { QuestionContainer, Container, GeneralQuestion, AnswerBlock, AnswerContainer, PreviewText } from './style';

import { Draggable } from 'react-beautiful-dnd';
import { EditorQuestion, EditorAnswer, TestEditorContext } from 'context';
import { CustomCheckbox } from 'components';
import { toolbarConfig } from 'const';
import { Collapse, Grid } from '@material-ui/core';

import { questionPreview } from './QuestionEditor';

type QuestionViewerProps = {
  index: number;
  question: EditorQuestion;
};

export const QuestionViewer: FC<QuestionViewerProps> = ({ index, question }) => {
  const { questions, setHintedQuestion } = useContext(TestEditorContext);

  const toggleDetails = () => {
    const updated = {
      ...questions.hinted[index],
      isOpen: !questions.hinted[index].isOpen,
    };

    setHintedQuestion(updated, index);
  };

  return (
    <Container>
      <Draggable draggableId={question.id} index={index}>
        {(provided, snapshot) => (
          <QuestionContainer
            isDragging={snapshot.isDragging}
            error={false}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <GeneralQuestion open={question.isOpen}>
              <ExpandMoreIcon id="ExpandMoreIcon" className="ico" onClick={toggleDetails} />
              <PreviewText>{questionPreview(question)}</PreviewText>

              <input value={question.maxScore} min={0} max={10} disabled />
            </GeneralQuestion>

            <Collapse in={question.isOpen} timeout={500}>
              <RichTextEditor toolbarConfig={toolbarConfig} className="text-editor" value={question.value} readOnly />

              {question.answers!.map((item) => (
                <AnswerViewer key={item.id} answer={item} />
              ))}
            </Collapse>
          </QuestionContainer>
        )}
      </Draggable>
    </Container>
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
