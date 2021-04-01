import { FormEventHandler, FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { GoogleLoginButton, Form, FormButton, FormInputWithErrors, FormGroup } from 'components';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const Regex = RegExp(String.raw`^[A-Z][a-z]+$`);

const schema = yup.object().shape({
  email: yup.string().required('Adres email jest wymagany').email('Wprowadź poprawny adres email'),
  name: yup.string().required('Imię jest wymagane').matches(Regex, 'Wprowadź poprawne imię'),
  surname: yup.string().required('Nazwisko jest wymagane').matches(Regex, 'Wprowadź poprawne nazwisko'),
  password: yup.string().required('Hasło jest wymagane').min(8, 'Minimalna długość hasła: 8 znaków'),
  password2: yup.string().oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać'),
});

const inputs = [
  {
    label: 'email',
    name: 'email',
    type: 'text',
    placeholder: 'Email..',
  },
  {
    label: 'imie',
    name: 'name',
    type: 'text',
    placeholder: 'Imię..',
  },
  {
    label: 'nazwisko',
    name: 'surname',
    type: 'text',
    placeholder: 'Nazwisko..',
  },
  {
    label: 'haslo',
    name: 'password',
    type: 'password',
    placeholder: 'Hasło..',
  },
  {
    label: 'haslo2',
    name: 'password2',
    type: 'password',
    placeholder: 'Powtórz hasło..',
  },
];

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onSuccessGoogle: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailureGoogle: (error: any) => void;
};

export const SignupForm: FunctionComponent<Props> = ({ onSubmit, onSuccessGoogle, onFailureGoogle }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [state, setState] = useState({ email: '', name: '', surname: '', password: '', password2: '' });

  const changeValue = (name: string, targetValue: string): void => setState({ ...state, [name]: targetValue });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Stwórz konto</h2>

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

      <FormButton>Zarejestruj się</FormButton>
      <GoogleLoginButton
        buttonText="Zaloguj się przez konto Google"
        onSuccess={onSuccessGoogle}
        onFailure={onFailureGoogle}
      />
    </Form>
  );
};
