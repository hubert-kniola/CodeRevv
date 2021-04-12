import { FunctionComponent, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { LoadingOverlay, MessageOverlay, ReCaptcha } from 'components';
import { HomeNav, AutoForm, HomeFooter } from 'containers';
import { apiAxios, responseGoogle, captchaValidateHuman } from 'utility';
import { registerFormData } from 'const';

import type { RegisterSchema } from 'const';

export const Signup: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = async ({ name, surname, email, password }: RegisterSchema) => {
    setLoading(true);

    try {
      const token = await reCaptchaRef.current?.executeAsync();
      if (token == null) {
        setError('Błąd uwierzytelniania ReCAPTCHA. Spróbuj odświeżyć stronę.');
        return;
      }

      if (!(await captchaValidateHuman(token))) {
        setError('Nie mogliśmy zweryfikować czy jesteś człowiekiem. Możesz spróbować ponownie po odświeżeniu strony.');
        return;
      }

      const { data } = await apiAxios.post('/register/', {
        first_name: name,
        last_name: surname,
        email,
        password,
      });

      setMessage(
        `Na adres ${data.email} został wysłany e-mail z potwierdzeniem założenia konta. Kliknij w otrzymany link aby aktywować swoje konto.`
      );
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setError('W naszej bazie istnieje już użytkownik o podanym adresie e-mail.');
        } else if (err.response.status !== 201) {
          setError('Nie udało się założyć konta. Proszę spróbować ponownie po odświeżeniu strony.');
        }
      } else {
        setError('Nasz serwer nie odpowiada. Jeśli masz dostęp do internetu oznacza to że mamy awarię :(');
      }
    }

    setLoading(false);
  };

  return (
    <>
      <HomeNav />

      <MessageOverlay active={message != null} title="Gratulacje!" text={message!}>
        <MessageOverlay active={error != null} title="Wystąpił błąd." text={error!}>
          <LoadingOverlay active={loading} text="Zakładamy twoje konto...">
            <AutoForm
              headerText="Stwórz konto"
              formData={registerFormData}
              onSubmit={onSubmit}
              onSuccessGoogle={responseGoogle}
              onFailureGoogle={responseGoogle}
              buttonText="Zarejestruj się"
            />
            <ReCaptcha ref={reCaptchaRef} />
          </LoadingOverlay>
        </MessageOverlay>
      </MessageOverlay>
      <HomeFooter />
    </>
  );
};
