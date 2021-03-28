import { HomeFooter, HomeNav, LoginForm } from 'containers';

const Login = ({history}) => {
  return (
    <>
      <HomeNav />

      <LoginForm history={history}/>

      <HomeFooter />
    </>
  );
};

export default Login;
