import { FunctionComponent, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { ReCAPTCHA } from 'react-google-recaptcha';

import { HomeNav, HomeFooter, AutoForm } from 'containers';
import { LoadingOverlay, MessageOverlay, ReCaptcha } from 'components';
import { apiAxios } from 'utility';
import { changePasswordFormData, ChangePasswordSchema, recoverFormData, RecoverSchema } from 'const';

type RouteParams = {
  uid?: string;
  token?: string;
};

const PasswordRecover: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const { uid, token } = useParams<RouteParams>();
  const history = useHistory();

  const isStageTwo = () => uid != null && token != null;

  const onEmailSubmit = async ({ email }: RecoverSchema) => {
    setLoading(true);

    try {
      await apiAxios.post('/reset/', { email });
      setMessage(
        `Jeśli dla podanego adresu e-mail istnieje konto w serwisie to został wysłany link. Otwórz go aby zresetować hasło. 
        Jeśli w ciągu 5 minut nie otrzymasz żadnego maila - odśwież stronę i spróbuj ponownie.`
      );
    } catch (err) {
      setError('Nie możemy połączyć się z serwerem, spróbuj jeszcze raz po odświeżeniu strony.');
    }

    setLoading(false);
  };

  const onPasswordSubmit = async ({ password }: ChangePasswordSchema) => {
    setLoading(true);

    if (!isStageTwo()) {
      history.push('/recover');
      return;
    }

    try {
      const { data } = await apiAxios.post('/recover/', { password, uid, token });

      if (data.success === true) {
        setMessage('Hasło zostało poprawnie zresetowane. Możesz się teraz zalogować.');
      } else {
        setError('Wprowadzone dane są nieprawidłowe.');
      }
    } catch (err) {
      setError('Nie możemy połączyć się z serwerem, spróbuj jeszcze raz.');
    }

    setLoading(false);
  };

  return (
    <>
      <HomeNav />

      <LoadingOverlay active={loading} text="Chwilka...">
        <MessageOverlay active={error != null} title="Wystąpił błąd." text={error!}>
          <MessageOverlay active={message != null} text={message!}>
            {isStageTwo() ? (
              <>
                <AutoForm
                  headerText="Wprowadź nowe hasło do konta"
                  formData={changePasswordFormData}
                  onSubmit={onPasswordSubmit}
                  buttonText="Zmień hasło"
                />
                <ReCaptcha ref={reCaptchaRef} />
              </>
            ) : (
              <>
                <AutoForm
                  headerText="Wprowadź adres e-mail przypisany do konta aby zresetować hasło"
                  formData={recoverFormData}
                  onSubmit={onEmailSubmit}
                  buttonText="Zresetuj hasło"
                />
                <ReCaptcha ref={reCaptchaRef} />
              </>
            )}
          </MessageOverlay>
        </MessageOverlay>
      </LoadingOverlay>

      <HomeFooter />
    </>
  );
};

export default PasswordRecover;