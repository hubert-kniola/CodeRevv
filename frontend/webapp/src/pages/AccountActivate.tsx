import { FunctionComponent, useEffect, useState } from 'react';

import { HomeNav, HomeFooter } from 'containers';
import { LoadingOverlay, MessageOverlay } from 'components';
import { apiAxios } from 'utility';
import { useParams } from 'react-router-dom';

type RouteParams = {
  uid: string;
  token: string;
};

const AccountActivate: FunctionComponent = () => {
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
            ? 'Dziękujemy za aktywację konta. Możesz się teraz zalogować.'
            : 'Link aktywacji konta jest niepoprawny. Spróbuj ponownie.'
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
        <MessageOverlay active={!loading} text={message!} />
      </LoadingOverlay>

      <HomeFooter />
    </>
  );
};

export default AccountActivate;
