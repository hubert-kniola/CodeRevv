import { FunctionComponent, useEffect, useState } from 'react';

import { HomeNav, HomeFooter } from 'containers';
import { LoadingOverlay, Title } from 'components';
import { apiAxios } from 'utility';
import { useParams } from 'react-router-dom';

type RouteParams = {
  uid: string;
  token: string;
};

export const AccountActivate: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { uid, token } = useParams<RouteParams>();

  useEffect(() => {
    setLoading(true);

    const notifyApi = async () => {
      try {
        const { data } = await apiAxios.post('/activate/', { uid, token });
        setMessage(
          data.success === true
            ? 'Dziękujemy za założenie konta. Możesz się teraz zalogować.'
            : 'Link aktywacji konta jest niepoprawny.'
        );
      } catch (err) {
        setMessage('Wystąpił problem z połączeniem. Spróbuj odświeżyć przeglądarkę.');
      }

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
