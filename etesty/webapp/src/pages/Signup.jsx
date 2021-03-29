import { useContext } from 'react';

import { AuthContext } from 'context';
import { HomeNav, SignupForm, HomeFooter } from 'containers';

const Signup = () => {
  const authContext = useContext(AuthContext);

  const onSubmit = async (credentials) => {
    try {
      const { data } = await authContext.axios.post('/signup', credentials);
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

      <SignupForm onSubmit={onSubmit} onSuccessGoogle={responseGoogle} onFailureGoogle={responseGoogle} />

      <HomeFooter />
    </>
  );
};

export default Signup;
