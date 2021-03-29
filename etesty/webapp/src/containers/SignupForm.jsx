import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import { GoogleButton, Form } from 'components';

const Regex = String.raw`^[A-Z][a-z]+$`;

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

const Url = 'http://httpbin.org/post'; //'http://localhost:8000/login/';

const RegisterForm = ({ history }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [state, setState] = useState({ email: '', name: '', surname: '', password: '', password2: '' });

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    history.push({ pathname: '/dashboard' });
  };

  const onSubmit = async (data) => {
    console.log(data);

    axios.post(Url, data).then(console.log).catch(console.log);

    //history.push({ pathname: '/dashboard' });
  };

  const changeValue = (name, targetValue) => setState({ ...state, [name]: targetValue });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Stwórz konto</h2>

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

      <Form.Button>Zarejestruj się</Form.Button>
      <GoogleButton buttonText="Zaloguj się przez konto Google" onSuccess={responseGoogle} onFailure={responseGoogle} />
    </Form>
  );
};

export default RegisterForm;
