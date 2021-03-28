import React, { useState } from 'react';
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

const LoginForm = ({ history }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    history.push({ pathname: '/dashboard' });
  };

  const onSubmit = async (data) => {
    console.log(data);
    let item = { email, password };
    let result = await fetch('http://localhost:8000/login/', {
      methode: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    localStorage.setItem('user-info', JSON.stringify(result));
    history.push({ pathname: '/dashboard' });
  };

  const changeValue = (name, targetValue) => {
    if (name === 'email') setEmail(targetValue);
    else if (name === 'password') setPassword(targetValue);
  };

  const login = () => {
    console.log();
  };

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
      <GoogleButton buttonText="Zaloguj się przez konto Google" onSuccess={responseGoogle} onFailure={responseGoogle} />
    </Form>
  );
};

export default LoginForm;
