import { FunctionComponent, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { ReCAPTCHA } from 'react-google-recaptcha';

import { HomeNav, HomeFooter, Recover } from 'containers';
import { LoadingOverlay } from 'components';
import { apiAxios } from 'utility';

import type { ChangePasswordSchema, RecoverSchema } from 'const';

type RouteParams = {
  id?: string;
};

export const PasswordRecover: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const { id } = useParams<RouteParams>();

  const onEmailSubmit = async (recover: RecoverSchema) => {
    setLoading(true);

    try {
      //TODO endpoint
      const { data } = await apiAxios.post('/recover/', { recover });
      window.alert(data);
    } catch (err) {
      window.alert(err);
      setError(err);
    }

    setLoading(false);
  };

  const onPasswordSubmit = async (changePwd: ChangePasswordSchema) => {
    setLoading(true);

    try {
      //TODO endpoint
      const { data } = await apiAxios.post('/recover/pwd', { changePwd });
      window.alert(data);
    } catch (err) {
      window.alert(err);
      setError(err);
    }

    setLoading(false);
  };

  return (
    <>
      <HomeNav />

      <LoadingOverlay active={loading} text="Chwilka...">
        <Recover
          hasId={id != null}
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
