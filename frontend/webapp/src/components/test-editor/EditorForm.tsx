import { FC, FormEvent, useState } from 'react';

import { Container, Input, Error, Header, Button } from './styles';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  testName: yup.string().required('Musisz wprowadzić nazwę testu').min(10, 'Nazwa musi mieć conajmniej 10 znaków'),
});

type Props = {
  onSubmit: SubmitHandler<FormEvent<HTMLFormElement>>;
};

type Question = {
  text: string;
  answers: string[];
};

type EditorState = {
  testName: string;
  questions: Question[];
};

export const EditorForm: FC<Props> = ({ children, onSubmit }) => {
  const [formState, setFormState] = useState({} as EditorState);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>Stwórz nowy test</Header>

        <Input
          name="testName"
          type="text"
          placeholder="Nazwa testu..."
          ref={register}
          onChange={(e) => setFormState({ ...formState, testName: e.target.value })}
        />
        <Error>{errors['testname']?.message}</Error>

        {children}

        <Button>Zakończ tworzenie</Button>
      </form>
    </Container>
  );
};
