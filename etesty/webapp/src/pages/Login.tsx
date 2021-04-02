import { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from 'context';
import { LoadingOverlay } from 'components';
import { AutoForm, HomeFooter, HomeNav } from 'containers';
import { apiAxios } from 'utility';
import { loginFormData } from 'const';

export const Login: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (credentials: any) => {
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

  const responseGoogle = (response: any) => {
    console.log(response);
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

      <HomeFooter />
    </>
  );
};
