import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Container, Error, Form, FormGroup, FormInner, Input } from './style.js';
import { GoogleButton } from 'components';
import { loginContent } from 'static';

const schema = yup.object().shape({
  email: yup.string().required().email('Wprowadź poprawny adres email'),
  password: yup.string().required().min(8, 'chuj w dupe działa'),
});

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInner>
          <h2>Zaloguj się</h2>

          <hr />

          {loginContent.inputs.map((input, key) => (
            <FormGroup key={key}>
              <Input name={input.name} type={input.type} placeholder={input.placeholder} ref={register} />
              <Error>{errors[input.name]?.message}</Error>
            </FormGroup>
          ))}

          <Button type="submit">Zaloguj się</Button>
          <GoogleButton buttonText="Zaloguj się przez konto Google" onSuccess={responseGoogle} onFailure={responseGoogle}/>
        </FormInner>
      </Form>
    </Container>
  );
};

export default LoginForm;
