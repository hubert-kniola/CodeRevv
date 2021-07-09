import { FC, FormEvent, useState, useContext, useRef, useEffect } from 'react';

import {
  Container,
  Input,
  Error,
  Header,
  Button,
  NewQuestionButton,
  CenteringContainer,
  QuestionList,
} from './styles';

import './styles.css';

import { Droppable } from 'react-beautiful-dnd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { QuestionEditor } from 'components';
import { TestEditorContext } from 'context';
import { testEditorSchema } from 'const';
import { TransitionGroup } from 'react-transition-group';

type Props = {
  onSubmit: SubmitHandler<FormEvent<HTMLFormElement>>;
  title: string;
};

export const TestEditorForm: FC<Props> = ({ onSubmit, title }) => {
  const [currentDeleteTimeout, setCurrentDeleteTimeout] = useState<NodeJS.Timeout | null>(null);
  const { questions, setTestName, setSingleQuestion, addEmptyQuestion, removeSingleQuestion } =
    useContext(TestEditorContext);

  const questionsRef = useRef(questions);
  questionsRef.current = questions;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(testEditorSchema),
  });

  useEffect(() => {
    document.title = `Stwórz nowy test`;
  }, []);

  const removeQuestion = (pos: number) => {
    if (questions.length > 1 && questions[pos].lock && currentDeleteTimeout != null) {
      clearTimeout(currentDeleteTimeout);
      setCurrentDeleteTimeout(null);
      removeSingleQuestion(pos);
    } else if (currentDeleteTimeout == null) {
      setSingleQuestion({ ...questions[pos], lock: true }, pos);

      setCurrentDeleteTimeout(
        setTimeout(() => {
          setSingleQuestion({ ...questionsRef.current[pos], lock: false }, pos);
          setCurrentDeleteTimeout(null);
        }, 1000)
      );
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>{title}</Header>

        <CenteringContainer>
          <Input
            name="testName"
            type="text"
            placeholder="Nazwa testu..."
            ref={register}
            autoComplete="off"
            onChange={(e) => setTestName(e.target.value)}
          />
        </CenteringContainer>
        <CenteringContainer>
          <Error>{errors['testName']?.message}</Error>
        </CenteringContainer>

        <hr />

        <Header>Pytania testowe</Header>

        <Droppable droppableId={title}>
          {(provided) => (
            <QuestionList ref={provided.innerRef} {...provided.droppableProps}>
              <TransitionGroup>
                {questions.map((q, index) => (
                  <QuestionEditor index={index} question={q} onDelete={() => removeQuestion(index)} />
                ))}
                {provided.placeholder}
              </TransitionGroup>
            </QuestionList>
          )}
        </Droppable>

        <CenteringContainer>
          <NewQuestionButton onClick={addEmptyQuestion}>Dodaj pytanie</NewQuestionButton>
        </CenteringContainer>

        <hr />

        <CenteringContainer>
          <Button>Zakończ i zapisz test</Button>
        </CenteringContainer>
      </form>
    </Container>
  );
};
