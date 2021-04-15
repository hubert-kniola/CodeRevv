import { FunctionComponent, useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from 'context';
import { LoadingOverlay, CenteredLink, MessageOverlay, scrollIntoMessageOverlay } from 'components';
import { AutoForm, HomeFooter, HomeNav } from 'containers';
import { apiAxios } from 'utility';
import { loginFormData } from 'const';

import type { LoginSchema } from 'const';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const Login: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  const history = useHistory();
  const errorRef = useRef<HTMLDivElement>(null);

  const handleLoginCallError = (error: any) => {
    if (error.response.status === 500) {
      setError('Nasz serwer nie odpowiada. Jeśli masz dostęp do internetu oznacza to że mamy awarię :(');
    } else {
      setError('Nieprawidłowy adres email lub hasło, spróbuj ponownie.');
    }

    scrollIntoMessageOverlay(errorRef);
  };

  const onSubmit = async (credentials: LoginSchema) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiAxios.post('/login/', credentials);

      if (data.success === true) {
        authContext.updateAuthState(data.state);
        history.push('/dashboard');
        return;
      }
    } catch (err) {
      handleLoginCallError(err);
    }

    setLoading(false);
  };

  const isOnlineRespose = (response: any): response is GoogleLoginResponse =>
    (response as GoogleLoginResponse).profileObj !== undefined;

  const responseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    setLoading(true);
    setError(null);

    if (isOnlineRespose(response)) {
      try {
        const { data } = await apiAxios.post('/login/google/', response.profileObj);

        if (data.success === true) {
          authContext.updateAuthState(data.state);
          history.push('/dashboard');
          return;
        }
      } catch (err) {
        handleLoginCallError(err);
      }
    } else {
      setError('Google nie odpowiada, prosimy spróbować później.');
      scrollIntoMessageOverlay(errorRef);
    }

    setLoading(false);
  };

  return (
    <>
      <HomeNav />

      <MessageOverlay ref={errorRef} active={error != null} title="Wystąpił błąd..." text={error!} noLogo />

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

export default Login;
