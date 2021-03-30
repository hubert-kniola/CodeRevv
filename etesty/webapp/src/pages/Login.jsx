import { useContext, useHistory } from 'react';

import { AuthContext } from 'context';
import { HomeFooter, HomeNav, LoginForm } from 'containers';
import { apiAxios } from 'utility';

const Login = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (credentials) => {
    try {
      console.log(apiAxios);
      const { data } = await apiAxios.post('/login/', credentials);
      authContext.updateAuthState(data);

      window.alert('logged in');
      history.push('/dashboard');
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
