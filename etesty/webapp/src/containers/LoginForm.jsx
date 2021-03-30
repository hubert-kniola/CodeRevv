import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { GoogleButton, Form } from 'components';

const schema = yup.object().shape({
  email: yup.string().required('Adres email jest wymagany').email('Wprowadź poprawny adres email'),
  password: yup.string().required('Hasło jest wymagane').min(8, 'Minimalna długość hasła: 8 znaków'),
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

<<<<<<< HEAD
const Url = 'http://localhost:8000/login/';

const LoginForm = ({ history }) => {
=======
const LoginForm = ({ onSubmit, onSuccessGoogle, onFailureGoogle }) => {
>>>>>>> 9ae0ae1c0378d1de45384a60788c65c9f7655481
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [state, setState] = useState({ email: '', password: '' });

  const changeValue = (name, targetValue) => setState({ ...state, [name]: targetValue });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Zaloguj się</h2>

      <hr />

      {inputs.map((input, key) => (
        <Form.Group key={key}>
          <Form.InputWithErrors
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            ref={register}
            onChange={(e) => changeValue(input, e.target.value)}
          >
            {errors[input.name]?.message}
          </Form.InputWithErrors>
        </Form.Group>
      ))}

      <Form.Button>Zaloguj się</Form.Button>
      <GoogleButton buttonText="Zaloguj się przez konto Google" onSuccess={onSuccessGoogle} onFailure={onFailureGoogle} />
    </Form>
  );
};

export default LoginForm;
