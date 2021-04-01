import { FormEventHandler, FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { GoogleLoginButton, Form, FormButton, FormGroup, FormInputWithErrors } from 'components';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const schema = yup.object().shape({
  email: yup.string().required('Adres email jest wymagany').email('Wprowadź poprawny adres email'),
  password: yup.string().required('Hasło jest wymagane'),
});

const inputs = [
  {
    label: 'email',
    name: 'email',
    type: 'text',
    placeholder: 'Email..',
  },
  {
    label: 'haslo',
    name: 'password',
    type: 'password',
    placeholder: 'Hasło..',
  },
];

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onSuccessGoogle: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailureGoogle: (error: any) => void;
};

export const LoginForm: FunctionComponent<Props> = ({ onSubmit, onSuccessGoogle, onFailureGoogle }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [state, setState] = useState({ email: '', password: '' });
  const changeValue = (name: string, targetValue: string): void => setState({ ...state, [name]: targetValue });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Zaloguj się</h2>

      <hr />

      {inputs.map((input, key) => (
        <FormGroup key={key}>
          <FormInputWithErrors
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            ref={register}
            onChange={(e) => changeValue(input.name, e.target.value)}
          >
            {errors[input.name]?.message}
          </FormInputWithErrors>
        </FormGroup>
      ))}

      <FormButton>Zaloguj się</FormButton>
      <GoogleLoginButton
        buttonText="Zaloguj się przez konto Google"
        onSuccess={onSuccessGoogle}
        onFailure={onFailureGoogle}
      />
    </Form>
  );
};
