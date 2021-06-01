import { FC, useContext, useEffect, useState } from 'react';

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

import { SlidingPanel, CustomCheckbox, SmallPopup } from 'components';
import { Test, testListHeader } from 'const';
import { TestListContext } from 'context';

export const TestViewContainer: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export const HeaderToolBar: FC = () => {
  const context = useContext(TestListContext);

  return (
    <HeaderTool>
      <div>
        <h3>Liczba twoich testów: {context.tests.length}</h3>
        <p>Nadchodzący test: {context.nextTest ? context.nextTest.testName : '---'}</p>
        <p>Data: {context.nextTest ? context.nextTest.creationDate.toLocaleString() : '---'}</p>
      </div>

      <SearchField
        label="Wyszukaj..."
        variant="outlined"
        autoComplete="off"
        onChange={(e) => context.searchTest(e.target.value)}
      />
      <SelectList onChange={(e) => context.sortTests(e.target.value)}>
        <option value="DATE_DESC"> Data malejaco</option>
        <option value="DATE_ASC"> Data rosnąco</option>
        <option value="A_Z"> A..Z</option>
        <option value="Z_A"> Z..A</option>
      </SelectList>
    </HeaderTool>
  );
};

export const Table: FC = () => {
  const [headerChecked, setHeaderChecked] = useState(false);
  const context = useContext(TestListContext);

  const h = testListHeader;

  const selectAll = () => {
    context.selectCheckbox(h.id);
    setHeaderChecked((state) => !state);
  };

  return (
    <>
      <TableFormat id={h.id}>
        <CustomCheckbox id="input" onClick={selectAll} checked={headerChecked} />
        <div id="name">{h.testName}</div>
        <div>{h.testDate}</div>
        <div>{h.points}</div>
        <div>{h.time}</div>
        <div>{h.link}</div>
        <div>{h.details}</div>
        <div style={{ cursor: 'pointer', color: 'red' }} onClick={() => context.deleteTests(h.id)}>
          {h.deleteItem}
        </div>
      </TableFormat>
      <ScrollDiv>
        {context.tests.length > 0 ? (
          context.filteredTests.map((test) => <RowTable test={test} />)
        ) : (
          <div>Nie utworzyłeś żadnych testów.</div>
        )}
      </ScrollDiv>
    </>
  );
};

export type RowTableProp = {
  test: Test;
};

export const RowTable: FC<RowTableProp> = ({ test }) => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const context = useContext(TestListContext);

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
        <CustomCheckbox id="input" onClick={() => context.selectCheckbox(test.id)} checked={test.isChecked} />
        <div id="name" style={{ cursor: 'pointer' }} onClick={() => setOpen((open) => !open)}>
          {test.testName}
        </div>
        <div>{new Date(test.creationDate).toLocaleDateString()}</div>
        <div>{test.maxScore}</div>
        <div>---</div>
        <LinkButton onClick={onLinkClick}>{test.isLinkGenerated ? 'Kopiuj' : 'Generuj'}</LinkButton>
        <div>---</div>
        <LinkButton onClick={() => context.deleteTests(test.id)}>Usuń</LinkButton>
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
