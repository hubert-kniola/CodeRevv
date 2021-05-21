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

import { MessageOverlay, QuestionEditor } from 'components';
import { newQuestion, Question, TestEditorContext } from 'context';
import { testEditorSchema } from 'const';

type Props = {
  onSubmit: SubmitHandler<FormEvent<HTMLFormElement>>;
  title: string;
  buttonText: string;
};

export const TestEditorForm: FC<Props> = ({ onSubmit, title, buttonText }) => {
  const [currentDeleteTimeout, setCurrentDeleteTimeout] = useState<NodeJS.Timeout | null>(null);
  const { questions, setQuestions, setTestName } = useContext(TestEditorContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(testEditorSchema),
  });

  const addEmptyQuestion = () => {
    setQuestions((questions) => [...questions, newQuestion()]);
  };

  const setSingleQuestion = (q: Question, pos: number) => {
    setQuestions((questions) => [...questions.slice(0, pos), q, ...questions.slice(pos + 1)]);
  };

  const removeQuestion = (pos: number) => {
    if (questions[pos].lock && currentDeleteTimeout != null) {
      clearTimeout(currentDeleteTimeout);
      setCurrentDeleteTimeout(null);
      setQuestions((questions) => questions.filter((_, index) => index !== pos));
    } else if (currentDeleteTimeout == null) {
      setSingleQuestion({ ...questions[pos], lock: true }, pos);

      setCurrentDeleteTimeout(
        setTimeout(() => {
          setSingleQuestion({ ...questions[pos], lock: false }, pos);
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
              <QuestionEditor
                key={q.id}
                questionNo={index}
                question={q}
                setQuestionDelegate={(question) => setSingleQuestion(question, index)}
              />
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
