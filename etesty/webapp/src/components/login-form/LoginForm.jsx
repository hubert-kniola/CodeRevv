import { useForm } from 'react-hook-form';
import loginContent from 'static';
import './style.js';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Container, Error, Form, FormGroup, FormInner, Input } from './style.js';
import GoogleLogin from 'react-google-login';

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
          {loginContent.inputs.map((input, key) => {
            return (
              <FormGroup key={key}>
                <Input name={input.name} type={input.type} placeholder={input.placeholder} ref={register} />
                <Error>{errors[input.name]?.message}</Error>
              </FormGroup>
            );
          })}
          <Button type="submit" value="Zaloguj się" />
          <p>
            <GoogleLogin
              clientId="60927032667-n1p23ni28cu5ub543u751ggr0crmcnle.apps.googleusercontent.com"
              buttonText="Zaloguj się przez ziomka googla"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </p>
        </FormInner>
      </Form>
    </Container>
  );
};

export default LoginForm;
