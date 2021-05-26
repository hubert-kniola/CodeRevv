import { FC } from 'react';
import { TableFormat, HeaderTool, Container, Pagin } from './styles';
import TextField from '@material-ui/core/TextField';

export const TestViewContainer: FC = ({ children }) => {
  return (
    <Container>
      {children}
      <Pagin> - 1 2 3 ... 50 +</Pagin>
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



export const HeaderToolBar: FC<HeaderToolBarProps> = ({ numberOfTest, nextTestName, nextTestDate, searchTest,  sort}) => {
  return (
    <HeaderTool>
      <div>
        <h3>Liczba twoich testów: {numberOfTest}</h3>
        <p>Nadchodzący test: {nextTestName}</p>
        <p>Data: {nextTestDate}</p>
      </div>
      <TextField id="outlined-basic" label="Wyszukaj..." variant="outlined" onChange={(e) => searchTest(e.target.value)}/>
      <select onChange={(e) => sort(e.target.value)}>
        <option value='DATE_DESC'> Data malejaco</option>
        <option value='DATE_ASC'> Data rosnąco</option>
        <option value='A_Z'> A..Z</option>
        <option value='Z_A'> Z..A</option>
      </select>
      <button>Widok</button>
    </HeaderTool>
  );
};

export type RowProps = {
  id?: string;
  header?: boolean;
  testName: string;
  testDate: string;
  points: string;
  time: string;
  link: string;
  details: string;
  deleteItem: string;
};

export const RowItem: FC<RowProps> = ({id, header, testName, testDate, points, time, link, details, deleteItem}) => {
  return (
    <TableFormat id={id} >
      <input type="checkbox" onChange={id ? ()=>{console.log('select all')} : ()=>{console.log('select one') }}/>
      {header ?  <div id="name">{testName}</div> : <div id="name">{testName}</div>}
      <div>{testDate}</div>
      <div>{points}</div>
      <div>{time}</div>
      <div>{link}</div>
      <div>{details}</div>
      <div>{deleteItem}</div>
    </TableFormat>
  );
};

