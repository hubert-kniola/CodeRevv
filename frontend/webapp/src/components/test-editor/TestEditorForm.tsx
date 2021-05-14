import { FC, FormEvent } from 'react';

import { Container, Input, Error, Header, Button, NewQuestionButton, PlusIcon, QuestionWithDelete } from './styles';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  testName: yup.string().required('Musisz wprowadzić nazwę testu').min(10, 'Nazwa musi mieć conajmniej 10 znaków'),
});

export type Question = {
  text: string;
  answers: string[];
};

export type EditorState = {
  testName: string;
  questions: Question[];
};

type Props = {
  onSubmit: SubmitHandler<FormEvent<HTMLFormElement>>;
  title: string;
  buttonText: string;
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
};

export const TestEditorForm: FC<Props> = ({ onSubmit, title, buttonText, editorState, setEditorState }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const addEmptyQuestion = () => {
    const { questions } = editorState;
    setEditorState({ ...editorState, questions: [...questions, { text: 'TEST', answers: [] }] });
  };

  const removeQuestion = (pos: number) => {
    const { questions } = editorState;
    setEditorState({ ...editorState, questions: questions.filter((_, index) => index !== pos) });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>{title}</Header>

        <Input
          name="testName"
          type="text"
          placeholder="Nazwa testu..."
          ref={register}
          onChange={(e) => setEditorState({ ...editorState, testName: e.target.value })}
        />
        <Error>{errors['testName']?.message}</Error>

        <hr />

        <Header>Pytania</Header>

        {editorState.questions?.map((q, index) => (
          <QuestionWithDelete>
            <Header key={index}>{q.text}</Header>
            <div onClick={() => removeQuestion(index)}>X</div>
          </QuestionWithDelete>
        ))}

        <NewQuestionButton onClick={addEmptyQuestion}>
          <PlusIcon />
          <p>Dodaj pytanie</p>
        </NewQuestionButton>

        <hr />

        <Button>{buttonText}</Button>
      </form>
    </Container>
  );
};
