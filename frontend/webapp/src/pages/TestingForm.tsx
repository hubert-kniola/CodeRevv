import { FC, useEffect, useRef, useState, useContext } from 'react';

import { LoadingOverlay, MessageOverlay, scrollIntoMessageOverlay, PopupDialog, PopupDialogButton } from 'components';
import { AuthContext, TestFillContext, TestFillContextProvider } from 'context';
import { useHistory } from 'react-router-dom';
import { TestFillForm } from 'containers';
import { apiAxios } from 'utility';

const TestingFormIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const context = useContext(TestFillContext);
  const { logout } = useContext(AuthContext);

  const history = useHistory();

  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

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

  const onSubmit = async () => {
    setError(null);

    try {
      await context.onSubmit();
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

  const handleLeave = () => {
    logout();
    history.push('/dashboard');
  };

  const handleStart = () => {
    context.onTestStart();
  };

  const handleEnd = async () => {
    const { data } = await apiAxios.get(`/test/results/${context.test?.id}`);

    console.log({ data });
    console.log({ data: JSON.parse(data) });

    history.push('/dashboard');
  };

  const title1 = `Zaraz przystąpisz do rozwiązywania testu "${context.test?.testName}" stworzonego przez użytkownika ${context.test?.creator.name} ${context.test?.creator.surname}`;
  const body1 = `Jeśli to nie ty, wyloguj się poniższym przyciskiem. Po rozpoczęciu testu nie będzie możliwości jego ponownego uzupełnienia.`;

  const title2 = `Koniec`;
  const body2 = `GZ`;

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Mamy problem..." text={error!} noLogo />

      <LoadingOverlay active={loading} text="Pobieramy test..." logo />
      <PopupDialog open={!context.hasStarted && !loading && error == null} title={title1} body={body1}>
        <PopupDialogButton onClick={handleLeave}>Wyloguj mnie teraz</PopupDialogButton>
        <PopupDialogButton onClick={handleStart} primary>
          Chcę rozpocząć test
        </PopupDialogButton>
      </PopupDialog>

      <PopupDialog open={context.hasEnded && !loading && error == null} title={title2} body={body2}>
        <PopupDialogButton onClick={handleEnd} primary>
          Wróć do panelu użytkownika
        </PopupDialogButton>
      </PopupDialog>

      {context.hasStarted && <TestFillForm onSubmit={onSubmit} />}
    </>
  );
};

const TestingForm: FC = () => (
  <TestFillContextProvider>
    <TestingFormIn />
  </TestFillContextProvider>
);

export default TestingForm;
