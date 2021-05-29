import { FC, useState } from 'react';

import {
  TableFormat,
  HeaderTool,
  Container,
  TestName_detail,
  Container_details,
  Menu_details,
  Setting_details,
  ScrollDiv,
  SearchField,
  SelectList
} from './styles';
import { SlidingPanel, CustomCheckbox } from 'components';

export const TestViewContainer: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

type HeaderToolBarProps = {
  numberOfTest: number;
  nextTestName: string;
  nextTestDate: string;
  searchTest: (value: string) => void;
  changeView: () => void;
  sort: (type: string) => void;
};

export const HeaderToolBar: FC<HeaderToolBarProps> = ({
  numberOfTest,
  nextTestName,
  nextTestDate,
  searchTest,
  sort,
}) => {

  return (
    <HeaderTool>
      <div>
        <h3>Liczba twoich testów: {numberOfTest}</h3>
        <p>Nadchodzący test: {nextTestName}</p>
        <p>Data: {nextTestDate}</p>
      </div>
      <SearchField
        label="Wyszukaj..."
        variant="outlined"
        autoComplete="off"
        onChange={(e) => searchTest(e.target.value)}
      />
      <SelectList onChange={(e) =>sort(e.target.value) } >
          <option value="DATE_DESC"> Data malejaco</option>
          <option value="DATE_ASC"> Data rosnąco</option>
          <option value="A_Z"> A..Z</option>
          <option value="Z_A"> Z..A</option>
      </SelectList>
      <button>Widok</button>
    </HeaderTool>
  );
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

//DO WYJEBANIA
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
//DO WYJEBANIA

export type HeaderProp = {
  deleteALot: boolean
  tests: Test[];
  deleteItem: (id: string) => void;
  setChecked: (id: string) => void;
};

export const Table: FC<HeaderProp> = ({ tests, deleteItem, setChecked, deleteALot }) => {
  const [headerChecked, setHeaderChecked] = useState(false);

  const selectAll = () => {
    setChecked(header.id);
    setHeaderChecked((state) => !state);
  };

  return (
    <>
      <TableFormat id={header.id} deleted={deleteALot}>
        <CustomCheckbox id="input" onClick={selectAll} checked={headerChecked} />
        <div id="name">{header.testName}</div>
        <div>{header.testDate}</div>
        <div>{header.points}</div>
        <div>{header.time}</div>
        <div>{header.link}</div>
        <div>{header.details}</div>
        <div onClick={() => deleteItem(header.id) } id="delete" >Usuń</div>
      </TableFormat>
      <ScrollDiv>
        {tests.map((test) => (
          <RowTable test={test} deleteItem={deleteItem} setChecked={setChecked} />
        ))}
      </ScrollDiv>
    </>
  );
};

export type RowTableProp = {
  test: Test;
  deleteItem: (id: string) => void;
  setChecked: (id: string) => void;
};

export const RowTable: FC<RowTableProp> = ({ test, deleteItem, setChecked }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlidingPanel show={open} close={() => setOpen((state) => false)}>
        <TestDetails />
      </SlidingPanel>
      <TableFormat >
        <CustomCheckbox id="input" onClick={() => setChecked(test.id)} checked={test.isChecked} />
        <div id="name" onClick={() => setOpen((open) => !open)}>
          {test.testName}
        </div>
        <div>{test.creationDate.toLocaleDateString()}</div>
        <div>{test.creatorId.toString()}</div>
        <div>25 min</div>
        <div>{test.isLinkGenerated.toString()}</div>
        <div>FAKERS</div>
        <div onClick={() => deleteItem(test.id)}>Usuń</div>
      </TableFormat>
    </>
  );
};

const TestDetails: FC = () => {
  return (
    <>
      <TestName_detail> Nazwa testu: Bąk Gucio grzmoci studentów </TestName_detail>
      <Container_details>
        <Menu_details>
          <button id="first">Ustawienia</button>
          <button>Dodaj użytkowników</button>
          <button>Edytuj</button>
          <button id="last">Usuń</button>
        </Menu_details>
        <Setting_details> ustawienia </Setting_details>
      </Container_details>
    </>
  );
};
