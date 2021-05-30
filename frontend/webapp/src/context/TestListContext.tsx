import { Test, testsFromResponse } from 'const';
import { createContext, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { apiAxios } from 'utility';

export interface ITestListContext {
  tests: Test[];
  filteredTests: Test[];
  nextTest?: Test;
  searchTest: (value: string) => void;
  sortTests: (value: string) => void;
  onLoading: () => Promise<void>;
  selectCheckbox: (value: string) => void;
  deleteTests: (value: string) => void;
}

export const TestListContext = createContext({} as ITestListContext);

export const TestListContextProvider: FC = ({ children }) => {
  const [tests, setTests] = useState([] as Test[]);

  const [filteredTests, setFilteredTest] = useState(tests);
  const [nextTest, setNextTests] = useState<Test | undefined>(undefined);
  const [checkedAll, setCheckedAll] = useState(false);

  const testsRef = useRef(tests);
  testsRef.current = tests;
  const filteredTestsRef = useRef(filteredTests);
  filteredTestsRef.current = filteredTests;
  const checkedAllRef = useRef(checkedAll);
  checkedAllRef.current = checkedAll;

  useEffect(() => {
    let tempTest = undefined;
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
  const searchTest = (value: string) => {
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
  const sortTests = (type: string) => {
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

  const deleteTests = (id: string) => {
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

  const onLoading = async () => {
    const { data } = await apiAxios.get('/test/list/creator');
    setTests(testsFromResponse(data, true));
  };

  return (
    <TestListContext.Provider
      value={{ tests, filteredTests, nextTest, searchTest, sortTests, onLoading, selectCheckbox, deleteTests }}
    >
      {children}
    </TestListContext.Provider>
  );
};
