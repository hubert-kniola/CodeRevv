import { FC, useEffect, useRef, useState, useContext } from 'react';

import {
  MessageOverlay,
  TestViewContainer,
  HeaderToolBar,
  Table,
  scrollIntoMessageOverlay,
  LoadingOverlay,
} from 'components';

import { TestListContext, TestListContextProvider } from 'context';

const TestListIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const context = useContext(TestListContext);

  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `Moje testy`;

    const fetch = async () => {
      setLoading((_) => true);

      try {
        await context.onLoading();
      } catch (err) {
        console.log({ parseErr: err });
        if (err.response) {
          setError('Nie udało się wczytać twoich testów.\nSpróbuj ponownie po odświeżeniu strony.');
        } else {
          setError('Nasz serwer nie odpowiada.\nJeśli masz dostęp do internetu oznacza to że mamy awarię :(');
        }
        scrollIntoMessageOverlay(errorRef);
      }

      setLoading((_) => false);
    };
    fetch();
  }, []);

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Błąd" text={error!} noLogo />

      <LoadingOverlay active={loading} text="Wczytujemy twoje testy..." logo>
        <TestViewContainer>
          <HeaderToolBar />
          <Table />
        </TestViewContainer>
      </LoadingOverlay>
    </>
  );
};

export const TestList: FC = () => (
  <TestListContextProvider>
    <TestListIn />
  </TestListContextProvider>
);
