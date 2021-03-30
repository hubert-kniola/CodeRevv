import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from 'context';
import { HomeNav, SignupForm, HomeFooter } from 'containers';
import { apiAxios } from 'util';

//TODO

const Signup = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async ({ name, surname, email, password }) => {
    try {
      const { data } = await apiAxios.post('/register/', { first_name: name, last_name: surname, email, password });
      authContext.updateAuthState(data);

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

      <SignupForm onSubmit={onSubmit} onSuccessGoogle={responseGoogle} onFailureGoogle={responseGoogle} />

      <HomeFooter />
    </>
  );
};

export default Signup;
