import { FunctionComponent, useEffect, useState } from 'react';

import { HomeNav, HomeFooter } from 'containers';
import { LoadingOverlay, Title } from 'components';
import { apiAxios } from 'utility';

type Props = {
  uid: string;
  token: string;
};

export const AccountActivate: FunctionComponent<Props> = ({ uid, token }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const notifyApi = async () => {
      const { data } = await apiAxios.post('/activate/', { uid, token });
      setMessage(
        data.success === false
          ? 'Link aktywacji konta jest niepoprawny.'
          : 'Dziękujemy za założenie konta. Możesz się teraz zalogować.'
      );
      setLoading(false);
    };

    notifyApi();
  }, [uid, token]);

  return (
    <>
      <HomeNav />

      <LoadingOverlay active={loading} text="Czekamy na odpowiedź serwera...">
        <Title>{message}</Title>
      </LoadingOverlay>

      <HomeFooter />
    </>
  );
};
