import { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { LoadingOverlay } from 'components';
import { AuthContext } from 'context';
import { HomeNav, AutoForm, HomeFooter } from 'containers';
import { apiAxios, responseGoogle } from 'utility';
import { registerFormData } from 'const';

import type { RegisterSchema } from 'const';

export const Signup: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async ({ name, surname, email, password }: RegisterSchema) => {
    setLoading(true);

    try {
      const { data } = await apiAxios.post('/register/', { first_name: name, last_name: surname, email, password });
      authContext.updateAuthState(data);

      history.push('/dashboard');
    } catch (err) {
      window.alert(err);
    }

    setLoading(false);
  };

  return (
    <>
      <HomeNav />

      <LoadingOverlay active={loading} text="Zakładamy twoje konto...">
        <AutoForm
          headerText="Stwórz konto"
          formData={registerFormData}
          onSubmit={onSubmit}
          onSuccessGoogle={responseGoogle}
          onFailureGoogle={responseGoogle}
          buttonText="Zarejestruj się"
        />
      </LoadingOverlay>

      <HomeFooter />
    </>
  );
};
