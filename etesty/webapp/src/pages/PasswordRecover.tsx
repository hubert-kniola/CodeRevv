import { FunctionComponent, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { ReCAPTCHA } from 'react-google-recaptcha';

import { HomeNav, HomeFooter, Recover } from 'containers';
import { LoadingOverlay } from 'components';
import { apiAxios } from 'utility';

import type { ChangePasswordSchema, RecoverSchema } from 'const';

type RouteParams = {
  uid?: string;
  token?: string;
};

export const PasswordRecover: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const { uid, token } = useParams<RouteParams>();

  const onEmailSubmit = async ({ email }: RecoverSchema) => {
    setLoading(true);

    try {
      const { data } = await apiAxios.post('/reset/', { email });
      setError(data.status === false);
    } catch (err) {
      window.alert(err);
      setError(err);
    }

    setLoading(false);
  };

  const onPasswordSubmit = async ({ password }: ChangePasswordSchema) => {
    setLoading(true);

    try {
      if (uid == null || token == null) {
        setError(true);
        return;
      }

      const { data } = await apiAxios.post('/recover/', { password, uid, token });
      setError(data.status === false);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return (
    <>
      <HomeNav />

      <LoadingOverlay active={loading} text="Chwilka...">
        <Recover
          hasId={uid != null && token != null}
          error={error}
          onEmailSubmit={onEmailSubmit}
          onPasswordSubmit={onPasswordSubmit}
          ref={reCaptchaRef}
        />
      </LoadingOverlay>

      <HomeFooter />
    </>
  );
};
