import { useContext } from 'react';

import { AuthContext } from 'context';
import { HomeFooter, HomeNav, LoginForm } from 'containers';
import { apiAxios } from 'util';

const Login = () => {
  const authContext = useContext(AuthContext);

  const onSubmit = async (credentials) => {
    try {
      const { data } = await apiAxios.post('/login', credentials);
      authContext.updateAuthState(data);

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
