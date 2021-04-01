import { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from 'context';
import { HomeNav, AutoForm, HomeFooter } from 'containers';
import { apiAxios } from 'utility';
import { registerFormData } from 'const';

export const Signup: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async ({ name, surname, email, password }: any) => {
    try {
      const { data } = await apiAxios.post('/register/', { first_name: name, last_name: surname, email, password });
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
        headerText="Stwórz konto"
        formData={registerFormData}
        onSubmit={onSubmit}
        onSuccessGoogle={responseGoogle}
        onFailureGoogle={responseGoogle}
        buttonText="Zarejestruj się"
      />

      <HomeFooter />
    </>
  );
};
