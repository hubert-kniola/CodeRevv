import { MessageOverlay, TestViewContainer, HeaderToolBar, RowItem } from 'components';
import { FC, useEffect, useRef, useState } from 'react';
import { scrollIntoMessageOverlay } from 'components';
import { apiAxios } from 'utility';
import type { RowProps } from 'components';
import { testEditorSchema } from 'const';
import { string } from 'yup/lib/locale';
import { truncate } from 'fs/promises';

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
};

const testsFromResponse = (data: any): Test[] =>
  data.tests.map((t: any) => ({
    id: t.id,
    creatorId: t.creator,
    testName: t.name,
    isLinkGenerated: t.is_link_generated,
    creationDate: new Date(t.pub_test).toLocaleString(),
    userIds: t.users,
    questions: t.questions.map((q: any) => ({
      content: q.content,
      index: q.index,
      questionType: q.question_type,
      maxScore: q.max_score,
      userAnswers: null,
      answers: q.answers.map((a: any) => ({
        index: a.index,
        content: a.content,
        isCorrect: a.is_correct,
        usersVoted: a.users_voted,
      })),
    })),
  }));

const header = {
  id: 'header',
  testName: 'Nazwa testu',
  testDate: 'Data',
  points: 'Punkty',
  time: 'Czas',
  link: 'Link',
  details: 'Szczegóły',
  deleteItem: 'Usuń',
} as RowProps;

const row = {
  testName: 'Gabriella_Grzmot_PZ_DESTRUKTOR',
  testDate: '31/05/2021',
  points: '5',
  time: '25min',
  link: 'zOOm',
  details: 'GB',
  deleteItem: 'Usuń',
} as RowProps;

//#region JAKIEŚ_RaNDOMOWE_TESTY
const TempTest = [
  {
    id: '#1',
    creatorId: 997,
    testName: 'Gabriella Grzmot',
    isLinkGenerated: true,
    creationDate: new Date('05/31/2021'),
    questions: [],
    userIds: [],
  },
  {
    id: '#2',
    creatorId: 12,
    testName: 'Totalne zniszczenie',
    isLinkGenerated: true,
    creationDate: new Date('05/27/2021'),
    questions: [],
    userIds: [],
  },
  {
    id: '#3',
    creatorId: 52,
    testName: 'Bąk ląduje na słoneczniku',
    isLinkGenerated: true,
    creationDate: new Date('10/01/2021'),
    questions: [],
    userIds: [],
  },
  {
    id: '#4',
    creatorId: 985,
    testName: 'Szybkie kładzenie kostki',
    isLinkGenerated: true,
    creationDate: new Date('07/01/2021'),
    questions: [],
    userIds: [],
  },
  {
    id: '#5',
    creatorId: 1324,
    testName: 'Jakiś random test',
    isLinkGenerated: true,
    creationDate: new Date('02/15/2021'),
    questions: [],
    userIds: [],
  },
  {
    id: '#6',
    creatorId: 997,
    testName: 'Gabriella Grzmot 2',
    isLinkGenerated: true,
    creationDate: new Date(),
    questions: [],
    userIds: [],
  },
  {
    id: '#7',
    creatorId: 52,
    testName: 'Bąk Gucio',
    isLinkGenerated: true,
    creationDate: new Date(),
    questions: [],
    userIds: [],
  },
  {
    id: '#8',
    creatorId: 52,
    testName: 'Gitara Siema',
    isLinkGenerated: true,
    creationDate: new Date(),
    questions: [],
    userIds: [],
  },
] as Test[];
//#endregion

export const TestList: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState(TempTest as Test[]);
 
  const errorRef = useRef<HTMLDivElement>(null);

  //#region  TEN_REGION_MUSI_WRÓCIĆ_!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // useEffect(() => {
  //   const fetchAndUpdate = async () => {
  //     try {
  //       const { data } = await apiAxios.get('/test/list');

  //       setTests(testsFromResponse(data));
  //     } catch (err) {
  //       if (err.response) {
  //         setError('Nie udało się wczytać twoich testów.\nSpróbuj ponownie po odświeżeniu strony.');
  //       } else {
  //         setError('Nasz serwer nie odpowiada.\nJeśli masz dostęp do internetu oznacza to że mamy awarię :(');
  //       }

  //       scrollIntoMessageOverlay(errorRef);
  //     }
  //   };

  //   fetchAndUpdate();
  // }, []);
  //#endregion

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Błąd" text={error!} noLogo />
      <DataGridList tests={tests} />
    </>
  );
};

type DataGridListProps = {
  tests: Test[];

};
 

const DataGridList: FC<DataGridListProps> = ({ tests }) => {
  const [filteredTests, setFilteredTest] = useState(tests);
  const [nextTest, setNextTests] = useState( {} as Test);
  
  useEffect(() => {
    let tempTest = {} as Test;
    let time = -1 as number;

    tests.forEach((test) => {
      let currentDate = new Date().getDate().valueOf();
      let testTime = test.creationDate.getDate().valueOf() - currentDate;

      if (time < 0) {
        time = testTime;
        tempTest = test;
      }

      if (testTime < time && testTime >=0) {
        time = testTime;
        tempTest = test;
      }
    });
    setNextTests(tempTest);
  }, [tests.length]);

  const searchItemHandler = (value: string) => {
    if (value === '') {
      setFilteredTest(tests);
    } else if (tests.length > 0) {
      setFilteredTest((tests) =>
        tests.filter((test) => {
          return test.testName.toLowerCase().trim().includes(value);
        })
      );
    }
  };

  const sort = (type: string) => {
    if (tests.length > 0 && type.length > 2) {
      setFilteredTest((tests) => [
        ...tests.sort((a, b) => {
          if (type == 'DATE_DESC') {
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

  
  return (
    <TestViewContainer>
      <HeaderToolBar
        numberOfTest={tests.length}
        nextTestName={nextTest.testName ? nextTest.testName : '---'}
        nextTestDate={nextTest.creationDate ? nextTest.creationDate!.toLocaleDateString() : '---'}
        searchTest={searchItemHandler}
        changeView={() => {}}
        sort={sort}
      />

      <RowItem
        id={header.id}
        header={true}
        testName={header.testName}
        testDate={header.testDate}
        points={header.points}
        time={header.time}
        link={header.link}
        details={header.details}
        deleteItem={header.deleteItem}
      />
      {filteredTests.map((item) => {
        return (
          <RowItem
            key={item.id}
            testName={item.testName}
            testDate={item.creationDate.toLocaleDateString()}
            points={item.creatorId.toString()}
            time={'25 min'}
            link={item.isLinkGenerated.toString()}
            details={'FAKERS'}
            deleteItem={'Usuń'}
          />
        );
      })}
    </TestViewContainer>
  );
};
