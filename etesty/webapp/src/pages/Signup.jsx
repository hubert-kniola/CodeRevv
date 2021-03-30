import { useContext } from 'react';

import { AuthContext } from 'context';
import { HomeNav, SignupForm, HomeFooter } from 'containers';

const Signup = () => {
  const authContext = useContext(AuthContext);

  const onSubmit = async ({name, surname, email, password}) => {
    try {
      const { data } = await authContext.apiAxios.post('/register/', {name, surname, email, password});
      authContext.updateAuthState(data);

      window.alert('success on register');

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
