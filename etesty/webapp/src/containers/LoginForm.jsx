import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { GoogleButton, Form } from 'components';

const schema = yup.object().shape({
  email: yup.string().required().email('Wprowadź poprawny adres email'),
  password: yup.string().required().min(8, 'chuj w dupe działa'),
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

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    history.push({ pathname: '/dashboard' });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Zaloguj się</h2>

      <hr />

      {inputs.map((input, key) => (
        <Form.Group key={key}>
          <Form.InputWithErrors name={input.name} type={input.type} placeholder={input.placeholder} ref={register}>
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
