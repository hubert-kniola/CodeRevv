import { FC, useEffect, useRef, useState } from 'react';

import {
  MessageOverlay,
  TestViewContainer,
  HeaderToolBar,
  Table,
  scrollIntoMessageOverlay,
  LoadingOverlay,
} from 'components';

import { Test, testsFromResponse } from 'const';
import { apiAxios } from 'utility';
import { TestListContextProvider } from 'context';

const TestListIn: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([] as Test[]);

  const [filteredTests, setFilteredTest] = useState(tests);
  const [nextTest, setNextTests] = useState({} as Test);
  const [checkedAll, setCheckedAll] = useState(false);

  const errorRef = useRef<HTMLDivElement>(null);
  const testsRef = useRef(tests);
  testsRef.current = tests;

  const filteredTestsRef = useRef(filteredTests);
  filteredTestsRef.current = filteredTests;

  const checkedAllRef = useRef(checkedAll);
  checkedAllRef.current = checkedAll;

  useEffect(() => {
    document.title = `Moje testy`;

    const fetch = async () => {
      setLoading((_) => true);

      try {
        const { data } = await apiAxios.get('/test/list/creator');
        setTests(testsFromResponse(data, true));
      } catch (err) {
        console.log({ parseErr: err });
        if (err.response) {
          setError('Nie udało się wczytać twoich testów.\nSpróbuj ponownie po odświeżeniu strony.');
        } else {
          setError('Nasz serwer nie odpowiada.\nJeśli masz dostęp do internetu oznacza to że mamy awarię :(');
        }
        scrollIntoMessageOverlay(errorRef);
      }

      console.log({ tests, filteredTests });

      setLoading((_) => false);
    };
    fetch();
  }, []);

  //Efekt wyszukuje najbliższy test (póki)

  useEffect(() => {
    let tempTest = {} as Test;
    let time = -1 as number;

    testsRef.current.forEach((test) => {
      let currentDate = new Date().getDate().valueOf();
      let testTime = test.creationDate.getDate().valueOf() - currentDate;

      if (time < 0) {
        time = testTime;
        tempTest = test;
      }

      if (testTime < time && testTime >= 0) {
        time = testTime;
        tempTest = test;
      }
    });
    setNextTests(tempTest);
  }, [testsRef.current.length]);

  //Aktualizuje filreredTest przy każdej zmianie tests
  useEffect(() => {
    setFilteredTest(tests);
  }, [testsRef.current, checkedAll]);

  //Wyszukuje testy po nazwie
  const searchItemHandler = (value: string) => {
    if (value === '') {
      setFilteredTest(testsRef.current);
    } else if (testsRef.current.length > 0) {
      setFilteredTest(testsRef.current);
      setFilteredTest((tests) =>
        tests.filter((test) => {
          return test.testName.toLowerCase().trim().includes(value.toLowerCase());
        })
      );
    }
  };

  //Sortuje według wyzanczonego kryterium
  const sort = (type: string) => {
    if (testsRef.current.length > 0 && type.length > 2) {
      setFilteredTest((tests) => [
        ...tests.sort((a, b) => {
          if (type === 'DATE_DESC') {
            return b.creationDate.getTime() - a.creationDate.getTime();
          } else if (type === 'DATE_ASC') {
            return a.creationDate.getTime() - b.creationDate.getTime();
          } else if (type === 'A_Z') {
            return a.testName > b.testName ? 1 : -1;
          } else {
            return a.testName < b.testName ? 1 : -1;
          }
        }),
      ]);
    }
  };

  const deleteTestsHandler = (id: string) => {
    if (id !== 'header') {
      setTests((tests) =>
        tests.filter((test) => {
          return test.id !== id;
        })
      );
    } else {
      setTests((tests) =>
        tests.filter((test) => {
          return test.isChecked !== true;
        })
      );
    }
  };

  const selectCheckbox = (id: string) => {
    if (id !== 'header') {
      const index = testsRef.current.findIndex((test) => test.id === id);
      setTests((tests) => [
        ...tests.slice(0, index),
        { ...tests[index], isChecked: !tests[index].isChecked },
        ...tests.slice(index + 1),
      ]);
    } else {
      const tempTests = testsRef.current;
      tempTests.forEach((test) => {
        test.isChecked = checkedAll ? false : true;
      });
      setCheckedAll((state) => !state);
      setTests(tempTests);
    }
  };

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Błąd" text={error!} noLogo />

      <LoadingOverlay active={loading} text="Wczytujemy twoje testy..." logo>
        <TestViewContainer>
          <HeaderToolBar
            numberOfTest={tests.length}
            nextTestName={nextTest.testName ? nextTest.testName : '---'}
            nextTestDate={nextTest.creationDate ? nextTest.creationDate.toLocaleString() : '---'}
            searchTest={searchItemHandler}
            changeView={() => {}}
            sort={sort}
          />
          <Table
            tests={filteredTestsRef.current}
            deleteItem={deleteTestsHandler}
            setChecked={selectCheckbox}
            deleteALot={true}
          />
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
