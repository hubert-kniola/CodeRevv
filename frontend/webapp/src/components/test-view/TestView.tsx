import { FC, useEffect, useState } from 'react';

import {
  TableFormat,
  HeaderTool,
  Container,
  Container_details,
  ScrollDiv,
  SearchField,
  SelectList,
  LinkButton,
} from './styles';

import { SlidingPanel, CustomCheckbox, SmallPopup, CustomInput } from 'components';
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
      <CustomInput />

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
        {tests.length > 0 ? (
          tests.map((test) => <RowTable test={test} deleteItem={deleteItem} setChecked={setChecked} />)
        ) : (
          <div>Nie utworzyłeś żadnych testów.</div>
        )}
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
  const [link, setLink] = useState<string | null>(null);

  const onLinkClick = () => {
    const url = `http://localhost:3000/test/${test.id}`;
    setLink((_) => url);
    navigator.clipboard.writeText(url);
  };

  return (
    <>
      <SmallPopup show={link != null} onTimeout={() => setLink((_) => null)}>
        Link do testu jest już w twoim schowku!
        <br />
        <strong>
          <a target="_blank" href={link!}>
            {link}
          </a>
        </strong>
      </SmallPopup>

      <SlidingPanel show={open} close={() => setOpen((_) => false)} title={test.testName}>
        <TestDetails test={test} />
      </SlidingPanel>

      <TableFormat>
        <CustomCheckbox id="input" onClick={() => setChecked(test.id)} checked={test.isChecked} />
        <div id="name" style={{ cursor: 'pointer' }} onClick={() => setOpen((open) => !open)}>
          {test.testName}
        </div>
        <div>{new Date(test.creationDate).toLocaleDateString()}</div>
        <div>{test.maxScore}</div>
        <div>---</div>
        <LinkButton onClick={onLinkClick}>{test.isLinkGenerated ? 'Kopiuj' : 'Generuj'}</LinkButton>
        <div>---</div>
        <div onClick={() => deleteItem(test.id)}>Usuń</div>
      </TableFormat>
    </>
  );
};

type TDProps = {
  test: Test;
};

type Result = {
  name: string;
  points: number;
};

const TestDetails: FC<TDProps> = ({ test }) => {
  const [results, setResults] = useState(undefined as Result[] | undefined);

  useEffect(() => {
    setResults(
      test.users
        ?.map((u) => ({
          name: `${u.firstName} ${u.lastName} - ${u.email}`,
          points: test.questions
            .map((q) => {
              let userPoints = 0;
              q.userAnswers?.filter((ua) => ua.user === u.id).forEach((ua) => (userPoints += ua.score));
              return userPoints;
            })
            .reduce((prev, accu) => prev + accu),
        }))
        .sort((a, b) => b.points - a.points)
    );
  }, [test]);

  return (
    <>
      <Container_details>
        <ol>
          {results?.length
            ? results?.map(({ name, points }) => (
                <li>
                  {name}: {points} pkt
                </li>
              ))
            : 'Nikt nie wykonał tego testu.'}
        </ol>
      </Container_details>
    </>
  );
};
