import { FunctionComponent, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { LoadingOverlay, MessageOverlay, ReCaptcha, scrollIntoMessageOverlay } from 'components';
import { HomeNav, AutoForm, HomeFooter } from 'containers';
import { apiAxios, captchaValidateHuman } from 'utility';
import { registerFormData } from 'const';

import type { RegisterSchema } from 'const';

const Signup: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const setFetchError = (error: string) => {
    setLoading(false);
    setError(error);
    scrollIntoMessageOverlay(errorRef);
  };

  const onSubmit = async ({ name, surname, email, password }: RegisterSchema) => {
    setLoading(true);

    const token = await reCaptchaRef.current?.executeAsync();
    if (token == null) {
      setFetchError('Błąd uwierzytelniania ReCAPTCHA. Odświeżyć stronę i spróbuj ponownie.');
      return;
    }

    try {
      if (!(await captchaValidateHuman(token))) {
        setFetchError(
          'Nie mogliśmy zweryfikować czy jesteś człowiekiem. Możesz spróbować ponownie po odświeżeniu strony.'
        );
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
          setError('Nie udało się założyć konta. Spróbuj ponownie po odświeżeniu strony.');
        }
      } else {
        setError('Nasz serwer nie odpowiada. Jeśli masz dostęp do internetu oznacza to że mamy awarię :(');
      }

      scrollIntoMessageOverlay(errorRef);
    }

    setLoading(false);
  };

  return (
    <>
      <HomeNav />

      <MessageOverlay ref={errorRef} active={error != null} title="Wystąpił błąd." text={error!} noLogo />

      <MessageOverlay active={message != null} title="Gratulacje!" text={message!}>
        <LoadingOverlay active={loading} text="Zakładamy twoje konto...">
          <AutoForm
            headerText="Stwórz konto"
            formData={registerFormData}
            onSubmit={onSubmit}
            buttonText="Zarejestruj się"
          />
          <ReCaptcha ref={reCaptchaRef} />
        </LoadingOverlay>
      </MessageOverlay>

      <HomeFooter />
    </>
  );
};

export default Signup;
