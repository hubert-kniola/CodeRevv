import { useContext } from 'react';

import { AuthContext } from 'context';
import { HomeFooter, HomeNav, LoginForm } from 'containers';

const Login = () => {
  const authContext = useContext(AuthContext);

  const onSubmit = async (credentials) => {
    try {
      const { data } = await authContext.apiAxios.post('/login/', credentials);
      authContext.updateAuthState(data);

      window.alert('logged in');

    } catch (err) {
      window.alert(err);
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <>
      <HomeNav />

      <LoginForm onSubmit={onSubmit} onSuccessGoogle={responseGoogle} onFailureGoogle={responseGoogle} />

      <HomeFooter />
    </>
  );
};

export default Login;
