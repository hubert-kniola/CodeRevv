import { FC, useEffect, useRef, useState } from 'react';
import { MessageOverlay, TestViewContainer, HeaderToolBar, Table } from 'components';
import { testsFromResponse } from 'const';

type UserAnswer = {
  content: string;
  user: number;
  comment?: string;
  score: number;
};

type Answer = {
  index: number;
  content: string;
  isCorrect: boolean;
  usersVoted?: number[];
};

type Question = {
  answers: Answer[];
  content: string;
  index: number;
  maxScore: number;
  questionType: string;
  userAnswers?: UserAnswer[];
};

type Test = {
  id: string;
  creatorId: number;
  testName: string;
  isLinkGenerated: boolean;
  creationDate: Date;
  questions: Question[];
  userIds: number[];
  isChecked: boolean;
};

const header = {
  id: 'header',
  isChecked: false,
  testName: 'Nazwa testu',
  testDate: 'Data',
  points: 'Punkty',
  time: 'Czas',
  link: 'Link',
  details: 'Szczegóły',
  deleteItem: 'Usuń',
};

//#region JAKIEŚ_RaNDOMOWE_TESTY
const TempTest = [
  {
    id: '#1',
    creatorId: 997,
    testName: 'Gabriella Grzmot',
    isLinkGenerated: true,
    creationDate: new Date('05/31/2021'),
    questions: [] as Question[],
    userIds: [] as number[],
    isChecked: false,
  },
  {
    id: '#2',
    creatorId: 12,
    testName: 'Totalne zniszczenie',
    isLinkGenerated: true,
    creationDate: new Date('05/27/2021'),
    questions: [],
    userIds: [],
    isChecked: false,
  },
  {
    id: '#3',
    creatorId: 52,
    testName: 'Bąk ląduje na słoneczniku',
    isLinkGenerated: true,
    creationDate: new Date('10/01/2021'),
    questions: [],
    userIds: [],
    isChecked: false,
  },
  {
    id: '#4',
    creatorId: 985,
    testName: 'Szybkie kładzenie kostki',
    isLinkGenerated: true,
    creationDate: new Date('07/01/2021'),
    questions: [],
    userIds: [],
    isChecked: false,
  },
  {
    id: '#5',
    creatorId: 1324,
    testName: 'Jakiś random test',
    isLinkGenerated: true,
    creationDate: new Date('02/15/2021'),
    questions: [],
    userIds: [],
    isChecked: false,
  },
  {
    id: '#6',
    creatorId: 997,
    testName: 'Gabriella Grzmot 2',
    isLinkGenerated: true,
    creationDate: new Date(),
    questions: [],
    userIds: [],
    isChecked: false,
  },
  {
    id: '#7',
    creatorId: 52,
    testName: 'Bąk Gucio',
    isLinkGenerated: true,
    creationDate: new Date(),
    questions: [],
    userIds: [],
    isChecked: false,
  },
  {
    id: '#8',
    creatorId: 52,
    testName: 'Gitara Siema',
    isLinkGenerated: true,
    creationDate: new Date(),
    questions: [],
    userIds: [],
    isChecked: false,
  },
] as Test[];
//#endregion

export const TestList: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState(TempTest as Test[]);

  const errorRef = useRef<HTMLDivElement>(null);
  const [filteredTests, setFilteredTest] = useState(tests);
  const [nextTest, setNextTests] = useState({} as Test);
  const [checkedAll, setCheckedAll] = useState(false);

  const testsRef = useRef(tests);
  testsRef.current = tests;
  const filteredTestsRef = useRef(filteredTests);
  filteredTestsRef.current = filteredTests;
  const checkedAllRef = useRef(checkedAll);
  checkedAllRef.current = checkedAll;

  useEffect(() => {
    // const fetchAndUpdate = async () => {
    //   try {
    //     const { data } = await apiAxios.get('/test/list');
    //     setTests(testsFromResponse(data));
    //   } catch (err) {
    //     if (err.response) {
    //       setError('Nie udało się wczytać twoich testów.\nSpróbuj ponownie po odświeżeniu strony.');
    //     } else {
    //       setError('Nasz serwer nie odpowiada.\nJeśli masz dostęp do internetu oznacza to że mamy awarię :(');
    //     }
    //     scrollIntoMessageOverlay(errorRef);
    //   }
    // };
    // fetchAndUpdate();
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
            return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
          } else if (type === 'DATE_ASC') {
            return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
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

      <TestViewContainer>
        <HeaderToolBar
          numberOfTest={tests.length}
          nextTestName={nextTest.testName ? nextTest.testName : '---'}
          nextTestDate={nextTest.creationDate ? nextTest.creationDate!.toLocaleDateString() : '---'}
          searchTest={searchItemHandler}
          changeView={() => {}}
          sort={sort}
        />
        <Table tests={filteredTestsRef.current} deleteItem={deleteTestsHandler} setChecked={selectCheckbox} deleteALot = {true} />
      </TestViewContainer>
    </>
  );
};
