import { FC, useEffect, useRef, useState, useContext } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, TestStartDialog } from 'components';
import { TestFillForm } from 'containers';
import { TestFillContext, TestFillContextProvider } from 'context';
import { TestEndDialog } from 'components';

const TestingFormIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const context = useContext(TestFillContext);

  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTest = async () => {
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

  const onSubmit = () => {
    context.onSubmit();
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
