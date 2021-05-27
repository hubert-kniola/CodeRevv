import { FC, useState, useEffect, Children } from 'react';
import { TableFormat, HeaderTool, Container, Pagination, TestDetails } from './styles';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import { opendirSync } from 'node:fs';

export const TestViewContainer: FC = ({ children }) => {
  return (
    <Container>
      {children}
      <Pagination>1 2 3 ... 99</Pagination>
    </Container>
  );
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
      <TextField
        id="outlined-basic"
        label="Wyszukaj..."
        variant="outlined"
        onChange={(e) => searchTest(e.target.value)}
      />
      <select onChange={(e) => sort(e.target.value)}>
        <option value="DATE_DESC"> Data malejaco</option>
        <option value="DATE_ASC"> Data rosnąco</option>
        <option value="A_Z"> A..Z</option>
        <option value="Z_A"> Z..A</option>
      </select>
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
  tests: Test[];
  deleteItem: (id: string) => void;
  setChecked: (id: string) => void;
};

export const Table: FC<HeaderProp> = ({ tests, deleteItem, setChecked }) => {
  const [headerChecked, setHeaderChecked] = useState(false);

  const selectAll = () => {
    setChecked(header.id);
    setHeaderChecked((state) => !state);
  };

  return (
    <>
      <TableFormat id={header.id}>
        <input type="checkbox" onClick={selectAll} checked={headerChecked} />
        <div id="name">{header.testName}</div>
        <div>{header.testDate}</div>
        <div>{header.points}</div>
        <div>{header.time}</div>
        <div>{header.link}</div>
        <div>{header.details}</div>
        <div onClick={() => deleteItem(header.id)}>Usuń</div>
      </TableFormat>
      {tests.map((test) => (
        <RowTable test={test} deleteItem={deleteItem} setChecked={setChecked} />
      ))}
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
      <TableFormat>
        <input type="checkbox" onClick={() => setChecked(test.id)} checked={test.isChecked} />
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
