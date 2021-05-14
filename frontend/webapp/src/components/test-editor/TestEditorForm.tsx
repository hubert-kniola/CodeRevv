import { FC, FormEvent, useState } from 'react';

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
} from './styles';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { MessageOverlay } from 'components';

const schema = yup.object().shape({
  testName: yup.string().required('Musisz wprowadzić nazwę testu').min(10, 'Nazwa musi mieć conajmniej 10 znaków'),
});

export type Question = {
  text: string;
  answers: string[];
  lock: boolean;
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
  const [currentDeleteTimeout, setCurrentDeleteTimeout] = useState<NodeJS.Timeout | null>(null);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const addEmptyQuestion = () => {
    const { questions } = editorState;
    setEditorState({ ...editorState, questions: [...questions, { text: 'TEST', answers: [], lock: false }] });
  };

  const removeQuestion = (pos: number) => {
    const { questions } = editorState;

    if (questions[pos].lock && currentDeleteTimeout != null) {
      clearTimeout(currentDeleteTimeout);
      setCurrentDeleteTimeout(null);
      setEditorState({ ...editorState, questions: questions.filter((_, index) => index !== pos) });
    } else if (currentDeleteTimeout == null) {
      setEditorState({
        ...editorState,
        questions: [...questions.slice(0, pos), { ...questions[pos], lock: true }, ...questions.slice(pos + 1)],
      });

      setCurrentDeleteTimeout(
        setTimeout(() => {
          setEditorState({
            ...editorState,
            questions: [...questions.slice(0, pos), { ...questions[pos], lock: false }, ...questions.slice(pos + 1)],
          });
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
            onChange={(e) => setEditorState({ ...editorState, testName: e.target.value })}
          />
          <Error>{errors['testName']?.message}</Error>
        </CenteringContainer>

        <hr />

        <Header>Pytania</Header>

        {editorState.questions?.map((q, index) => (
          <QuestionWithDelete>
            <MessageOverlay
              active={editorState.questions[index].lock}
              text="Na pewno chcesz usunąć pytanie? Aby potwierdzić kliknij ponownie na krzyżyk."
              noLogo
            >
              <div
                style={{
                  width: 'min(600px, 60vw)',
                  height: '100px',
                  marginInline: '20px',
                  backgroundColor: 'yellow',
                  display: 'inline-block',
                }}
                key={index}
              >
                {q.text}
              </div>
            </MessageOverlay>
            <div style={{ display: 'inline-block' }} onClick={() => removeQuestion(index)}>
              <RemoveIcon />
            </div>
          </QuestionWithDelete>
        ))}

        <CenteringContainer>
          <NewQuestionButton onClick={addEmptyQuestion}>
            <PlusIcon />
            <p style={{ display: 'inline-block', margin: 0 }}>Dodaj pytanie</p>
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
