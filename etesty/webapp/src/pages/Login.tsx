import { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from 'context';
import { LoadingOverlay, CenteredLink } from 'components';
import { AutoForm, HomeFooter, HomeNav } from 'containers';
import { apiAxios, responseGoogle } from 'utility';
import { loginFormData } from 'const';

import type { LoginSchema } from 'const';

export const Login: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (credentials: LoginSchema) => {
    setLoading(true);

    try {
      const { data } = await apiAxios.post('/login/', credentials);
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

      <LoadingOverlay active={loading} text="Sekundka...">
        <AutoForm
          headerText="Masz już konto?"
          formData={loginFormData}
          onSubmit={onSubmit}
          onSuccessGoogle={responseGoogle}
          onFailureGoogle={responseGoogle}
          buttonText="Zaloguj się"
        />
      </LoadingOverlay>

      <CenteredLink to="/recover">Zapomniałeś hasła?</CenteredLink>

      <HomeFooter />
    </>
  );
};
