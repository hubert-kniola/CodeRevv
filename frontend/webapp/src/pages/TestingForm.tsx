import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay } from 'components';
import { apiAxios } from 'utility';
import { Test, testFromResponse } from 'const';
import { TestFillForm } from 'containers';

type RouteParams = {
  id: string;
};

const TestingForm: FC = () => {
  const { id } = useParams<RouteParams>();
  const [test, setTest] = useState({} as Test);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await apiAxios.get(`/test/${id}`);

        setTest(testFromResponse(data));
      } catch (err) {
        if (err.response) {
          if (err.response.status_code === 403) {
            setError('Nie masz dostępu do tego testu.');
          } else {
            setError('Nie udało się pobrać tego testu.\nSpróbuj ponownie po odświeżeniu strony.');
          }
        } else {
          setError('Nasz serwer nie odpowiada.\nJeśli masz dostęp do internetu oznacza to że mamy awarię :(');
        }

        scrollIntoMessageOverlay(errorRef);
      }

      setLoading(false);
    };

    fetchTest();
  }, []);

  const onSubmit = async () => {};

  const onPartialSubmit = async () => {};

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Mamy problem..." text={error!} noLogo />

      <LoadingOverlay active={loading} text="Pobieramy test..." logo>
        <TestFillForm test={test} setTest={setTest} onSubmit={onSubmit} onPartialSubmit={onPartialSubmit} />
      </LoadingOverlay>
    </>
  );
};

export default TestingForm;
