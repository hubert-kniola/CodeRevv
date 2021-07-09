import { FC, useContext, useState } from 'react';

import { Container, Header, QuestionList } from './styles';
import './styles.css';

import { TestEditorContext } from 'context';
import { Droppable } from 'react-beautiful-dnd';
import { TransitionGroup } from 'react-transition-group';
import { QuestionViewer } from 'components';

type Props = {
  title: string;
};

export const QuestionCollection: FC<Props> = ({ title }) => {
  const { previousQuestions } = useContext(TestEditorContext);
  
  return (
    <Container>
      <Header>{title}</Header>
      <hr />

      <Droppable droppableId={title}>
        {(provided) => (
          <QuestionList ref={provided.innerRef} {...provided.droppableProps}>
            <TransitionGroup>
              {previousQuestions.map((q, index) => (
                <QuestionViewer index={index} question={q} />
              ))}
              {provided.placeholder}
            </TransitionGroup>
          </QuestionList>
        )}
      </Droppable>
    </Container>
  );
};
