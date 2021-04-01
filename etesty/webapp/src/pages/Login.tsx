import { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from 'context';
import { AutoForm, HomeFooter, HomeNav } from 'containers';
import { apiAxios } from 'utility';
import { loginFormData } from 'const';

export const Login: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (credentials: any) => {
    try {
      const { data } = await apiAxios.post('/login/', credentials);
      authContext.updateAuthState(data);

      history.push('/dashboard');
    } catch (err) {
      window.alert(err);
    }
  };

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <>
      <HomeNav />

      <AutoForm
        headerText="Masz już konto?"
        formData={loginFormData}
        onSubmit={onSubmit}
        onSuccessGoogle={responseGoogle}
        onFailureGoogle={responseGoogle}
        buttonText="Zaloguj się"
      />

      <HomeFooter />
    </>
  );
};
