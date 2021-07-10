import { FC, useContext } from 'react';

import { Container, Header, QuestionList } from './styles';

import { TestEditorContext } from 'context';
import { Droppable } from 'react-beautiful-dnd';
import { QuestionViewer } from 'components';

type Props = {
  title: string;
};

export const QuestionCollection: FC<Props> = ({ title }) => {
  const { questions } = useContext(TestEditorContext);

  return (
    <Container>
      <Header>{title}</Header>
      <hr />

      <Droppable droppableId={title} isDropDisabled>
        {(provided) => (
          <QuestionList ref={provided.innerRef} {...provided.droppableProps}>
            {questions.hinted.map((q, index) => (
              <QuestionViewer key={q.id} index={index} question={q} />
            ))}
            {provided.placeholder}
          </QuestionList>
        )}
      </Droppable>
    </Container>
  );
};
