import { FC, FormEvent, useState, useContext } from 'react';

import {
  Container,
  Input,
  Error,
  Header,
  Button,
  NewQuestionButton,
  PlusIcon,
  QuestionWithDelete,
  RemoveIcon,
  CenteringContainer,
  InlineItem,
} from './styles';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { MessageOverlay, QuestionEditor } from 'components';
import { newQuestion, Question, SetQuestionLambda, TestEditorContext } from 'context';

const schema = yup.object().shape({
  testName: yup.string().required('Musisz wprowadzić nazwę testu').min(10, 'Nazwa musi mieć conajmniej 10 znaków'),
});

type Props = {
  onSubmit: SubmitHandler<FormEvent<HTMLFormElement>>;
  title: string;
  buttonText: string;
};

export const TestEditorForm: FC<Props> = ({ onSubmit, title, buttonText }) => {
  const [currentDeleteTimeout, setCurrentDeleteTimeout] = useState<NodeJS.Timeout | null>(null);
  const { questions, setQuestions, setTestName } = useContext(TestEditorContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const addEmptyQuestion = () => {
    setQuestions((questions) => [...questions, newQuestion()]);
  };

  const removeQuestion = (pos: number) => {
    if (questions[pos].lock && currentDeleteTimeout != null) {
      clearTimeout(currentDeleteTimeout);
      setCurrentDeleteTimeout(null);
      setQuestions((questions) => questions.filter((_, index) => index !== pos));
    } else if (currentDeleteTimeout == null) {
      setQuestions((questions) => [
        ...questions.slice(0, pos),
        { ...questions[pos], lock: true },
        ...questions.slice(pos + 1),
      ]);

      setCurrentDeleteTimeout(
        setTimeout(() => {
          setQuestions((questions) => [
            ...questions.slice(0, pos),
            { ...questions[pos], lock: false },
            ...questions.slice(pos + 1),
          ]);
          setCurrentDeleteTimeout(null);
        }, 1000)
      );
    }
  };

  const handleSetQuestion = (q: Question | SetQuestionLambda) => {
    

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
            onChange={(e) => setTestName(e.target.value)}
          />
        </CenteringContainer>
        <CenteringContainer>
          <Error>{errors['testName']?.message}</Error>
        </CenteringContainer>

        <hr />

        <Header>Pytania</Header>

        {questions.map((q, index) => (
          <QuestionWithDelete>
            <MessageOverlay
              active={q.lock}
              text="Na pewno chcesz usunąć pytanie? Aby potwierdzić kliknij ponownie na krzyżyk."
              noLogo
            >
              <QuestionEditor key={q.id} questionNo={index} question={q} setQuestion={handleSetQuestion} />
            </MessageOverlay>

            <InlineItem onClick={() => removeQuestion(index)}>
              <RemoveIcon />
            </InlineItem>
          </QuestionWithDelete>
        ))}

        <CenteringContainer>
          <NewQuestionButton onClick={addEmptyQuestion}>
            <PlusIcon />
            <InlineItem>Dodaj pytanie</InlineItem>
          </NewQuestionButton>
        </CenteringContainer>

        <hr />

        <CenteringContainer>
          <Button>{buttonText}</Button>
        </CenteringContainer>
      </form>
    </Container>
  );
};
