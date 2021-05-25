import { MessageOverlay, TestView } from 'components';
import { FC, useEffect, useRef, useState } from 'react';
import { scrollIntoMessageOverlay } from 'components';
import { apiAxios } from 'utility';

// TUTAJ SĄ MOJE
import { Container, TableFormat, HeaderTool, Pagin } from './TestListStyle';
//KONIEC

import { DataGrid, GridColDef, GridLocaleText } from '@material-ui/data-grid';
import { Backdrop } from '@material-ui/core';

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

const columns: GridColDef[] = [
  { field: 'testName', headerName: 'Nazwa testu', width: 250 },
  { field: 'creationDate', headerName: 'Data utworzenia', width: 250 },
  { field: 'isLinkGenerated', headerName: 'Zaproszenia z linku?', width: 250 },
];

const locale: GridLocaleText = {
  // Root
  rootGridLabel: 'Siatka',
  noRowsLabel: 'Brak danych',
  noResultsOverlayLabel: 'Brak danych',
  errorOverlayDefaultLabel: 'Wystąpił błąd',

  // Density selector toolbar button text
  toolbarDensity: 'Density',
  toolbarDensityLabel: 'Density',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Comfortable',

  // Columns selector toolbar button text
  toolbarColumns: 'Columns',
  toolbarColumnsLabel: 'Wybierz kolumny',

  // Filters toolbar button text
  toolbarFilters: 'Filters',
  toolbarFiltersLabel: 'Show filters',
  toolbarFiltersTooltipHide: 'Hide filters',
  toolbarFiltersTooltipShow: 'Show filters',
  toolbarFiltersTooltipActive: (count) => (count !== 1 ? `${count} active filters` : `${count} active filter`),

  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Download as CSV',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Find column',
  columnsPanelTextFieldPlaceholder: 'Column title',
  columnsPanelDragIconLabel: 'Reorder column',
  columnsPanelShowAllButton: 'Show all',
  columnsPanelHideAllButton: 'Hide all',

  // Filter panel text
  filterPanelAddFilter: 'Add filter',
  filterPanelDeleteIconLabel: 'Delete',
  filterPanelOperators: 'Operators',
  filterPanelOperatorAnd: 'And',
  filterPanelOperatorOr: 'Or',
  filterPanelColumns: 'Columns',
  filterPanelInputLabel: 'Value',
  filterPanelInputPlaceholder: 'Filter value',

  // Filter operators text
  filterOperatorContains: 'contains',
  filterOperatorEquals: 'equals',
  filterOperatorStartsWith: 'starts widiv',
  filterOperatorEndsWith: 'ends widiv',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is not',
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',

  // Filter values text
  filterValueAny: 'Dowolnie',
  filterValueTrue: 'Tak',
  filterValueFalse: 'Nie',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Pokaż kolumny',
  columnMenuFilter: 'Filtruj',
  columnMenuHideColumn: 'Schowaj',
  columnMenuUnsort: 'Anuluj sortowanie',
  columnMenuSortAsc: 'Sortuj rosnąco',
  columnMenuSortDesc: 'Sortuj malejąco',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => (count !== 1 ? `${count} aktywne filtry` : `${count} aktywny filtr`),
  columnHeaderFiltersLabel: 'Pokaż filtry',
  columnHeaderSortIconLabel: 'Sortuj',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1 ? `Wybrano ${count.toLocaleString()} wiersze` : `${count.toLocaleString()} wybrany wiersz`,

  // Total rows footer text
  footerTotalRows: 'Suma wierszy:',

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Wybór wielokrotny',

  // Boolean cell text
  booleanCellTrueLabel: 'Tak',
  booleanCellFalseLabel: 'Nie',
};

export const TestList: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState([] as Test[]);
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
      <DataGridList />
    </>
  );
};

const DataGridList = () => {
  return (
    <Container>
      <HeaderTool>
        <div>
          <h3>Liczba twoich testów: 35</h3>
          <p>Nadchodzący test: Gabriella_Grzmot_PZ_DESTRUKTOR</p>
          <p>Data: 31/05/2021</p>
        </div>
        <input type="text" value="Wyszukaj..." />
        <button>Widok</button>
        <button>Filtry</button>
      </HeaderTool>
      <TableFormat id="header">
        <input type="checkbox" />
        <div id="name">Nazwa testu</div>
        <div>Data testu</div>
        <div>Punkty</div>
        <div>Czas:</div>
        <div>Link:</div>
        <div>Szczegóły</div>
        <div>Usuń</div>
      </TableFormat>
      <RowItem />
      <RowItem />
      <RowItem />
      <RowItem />
      <RowItem />
      <RowItem />
      <Pagin> - 1 2 3 ... 50 +</Pagin>
    </Container>
  );
};

const RowItem = () => {
  return (
    <TableFormat  className='header'>
      <input type="checkbox" />
      <div id="name">Gabriella_Grzmot_PZ_DESTRUKTOR</div>
      <div  className='header' >31/05/2021</div>
      <div>5</div>
      <div>25 min</div>
      <div>zOOm</div>
      <div>GB</div>
      <div>Usuń</div>
    </TableFormat>
  );
};
