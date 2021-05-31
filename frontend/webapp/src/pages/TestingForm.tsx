import { FC, useEffect, useRef, useState, useContext } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay } from 'components';
import { TestFillContext, TestFillContextProvider } from 'context';
import { TestEndDialog, TestFillForm, TestStartDialog } from 'containers';

const TestingFormIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const context = useContext(TestFillContext);

  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `Wypełnij test`;

    setLoading(true);
    setError(null);

    const fetchTest = async () => {
      try {
        await context.onTestInit();
      } catch (err) {
        console.log({ fetchErr: err });
        if (err.response) {
          if (err.response.status === 403) {
            setError('Nie masz dostępu do tego testu.');
          } else if (err.response.status === 409) {
            setError('Test został już przez Ciebie wypełniony.');
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

    if (!confirmLeave) {
      setConfirmLeave((_) => true);
      return;
    }

    setLoading(true);

    try {
      await context.onSubmit();
    } catch (err) {
      console.log({ submitErr: err });
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

      <LoadingOverlay active={loading} text="Jeszcze chwilka..." logo>
        <TestStartDialog open={!context.hasStarted && !loading && error == null} />
        <TestEndDialog
          onDismiss={() => setConfirmLeave((_) => false)}
          onConfirm={onSubmit}
          open={confirmLeave && !context.hasEnded && !loading && error == null}
        />

        {context.hasStarted && !context.hasEnded && <TestFillForm onSubmit={onSubmit} />}
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
