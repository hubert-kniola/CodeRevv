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
  SelectList,
} from './styles';
import { SlidingPanel, CustomCheckbox } from 'components';
import { Test, testListHeader } from 'const';

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
      <SelectList onChange={(e) => sort(e.target.value)}>
        <option value="DATE_DESC"> Data malejaco</option>
        <option value="DATE_ASC"> Data rosnąco</option>
        <option value="A_Z"> A..Z</option>
        <option value="Z_A"> Z..A</option>
      </SelectList>
      <button>Widok</button>
    </HeaderTool>
  );
};

export type HeaderProp = {
  deleteALot: boolean;
  tests: Test[];
  deleteItem: (id: string) => void;
  setChecked: (id: string) => void;
};

export const Table: FC<HeaderProp> = ({ tests, deleteItem, setChecked, deleteALot }) => {
  const [headerChecked, setHeaderChecked] = useState(false);

  const h = testListHeader;

  const selectAll = () => {
    setChecked(h.id);
    setHeaderChecked((state) => !state);
  };

  return (
    <>
      <TableFormat id={h.id} deleted={deleteALot}>
        <CustomCheckbox id="input" onClick={selectAll} checked={headerChecked} />
        <div id="name">{h.testName}</div>
        <div>{h.testDate}</div>
        <div>{h.points}</div>
        <div>{h.time}</div>
        <div>{h.link}</div>
        <div>{h.details}</div>
        <div onClick={() => deleteItem(h.id)} id="delete">
          Usuń
        </div>
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
      <SlidingPanel show={open} close={() => setOpen((_) => false)}>
        <TestDetails />
      </SlidingPanel>
      <TableFormat>
        <CustomCheckbox id="input" onClick={() => setChecked(test.id)} checked={test.isChecked} />
        <div id="name" onClick={() => setOpen((open) => !open)}>
          {test.testName}
        </div>
        <div>{test.creationDate}</div>
        <div>{test.creatorId.toString()}</div>
        <div>---</div>
        <div>{test.isLinkGenerated.toString()}</div>
        <div>---</div>
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
