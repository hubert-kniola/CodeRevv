import { FunctionComponent, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import { LoadingOverlay, ReCaptcha, Title } from 'components';
import { HomeNav, AutoForm, HomeFooter } from 'containers';
import { apiAxios, responseGoogle, captchaValidateHuman } from 'utility';
import { registerFormData } from 'const';

import type { RegisterSchema } from 'const';

export const Signup: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = async ({ name, surname, email, password }: RegisterSchema) => {
    setLoading(true);

    try {
      const token = await reCaptchaRef.current?.executeAsync();

      if (token == null) throw new Error('Błąd uwierzytelniania ReCAPTCHA. Spróbuj odświeżyć stronę.');
      if (!(await captchaValidateHuman(token))) throw new Error('Nie mogliśmy zweryfikować czy jesteś człowiekiem.');

      const { data } = await apiAxios.post('/register/', { first_name: name, last_name: surname, email, password });
      console.log({ post_register: data });

      window.alert('dostales maila')
      history.push('/login');
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <HomeNav />

      {error != null && <Title>{error}</Title>}

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

      <HomeFooter />
    </>
  );
};
