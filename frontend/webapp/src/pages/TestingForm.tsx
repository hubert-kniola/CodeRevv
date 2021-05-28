import { FC, useEffect, useRef, useState, useContext } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, TestStartDialog } from 'components';
import { TestFillForm } from 'containers';
import { TestFillContext, TestFillContextProvider } from 'context';
import { TestEndDialog } from 'components';
import { useHistory } from 'react-router-dom';

const TestingFormIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const context = useContext(TestFillContext);
  const history = useHistory();
  
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTest = async () => {
      setError(null);

      try {
        await context.onTestInit();
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

  const onSubmit = async () => {
    setError(null);

    try {
      await context.onSubmit();

      //TODO msg

      setTimeout(() => {
        history.push('/dashboard');
      }, 3000);

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

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Mamy problem..." text={error!} noLogo />

      <LoadingOverlay active={loading} text="Pobieramy test..." logo>
        <TestStartDialog open={!context.hasStarted && !loading && error == null} />
        <TestEndDialog open={context.hasEnded} />

        {context.hasStarted && <TestFillForm onSubmit={onSubmit} />}
      </LoadingOverlay>
    </>
  );
};

const TestingForm: FC = () => (
  <TestFillContextProvider>
    <TestingFormIn />
  </TestFillContextProvider>
);

export default TestingForm;
