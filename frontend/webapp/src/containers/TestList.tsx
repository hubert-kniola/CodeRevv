import { MessageOverlay, TestView } from 'components';
import { FC, useEffect, useRef, useState } from 'react';
import { scrollIntoMessageOverlay } from 'components';
import { apiAxios } from 'utility';

import { DataGrid, GridColDef, GridLocaleText } from '@material-ui/data-grid';

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
  filterOperatorStartsWith: 'starts with',
  filterOperatorEndsWith: 'ends with',
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

  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const { data } = await apiAxios.get('/test/list');

        setTests(testsFromResponse(data));
      } catch (err) {
        if (err.response) {
          setError('Nie udało się wczytać twoich testów.\nSpróbuj ponownie po odświeżeniu strony.');
        } else {
          setError('Nasz serwer nie odpowiada.\nJeśli masz dostęp do internetu oznacza to że mamy awarię :(');
        }

        scrollIntoMessageOverlay(errorRef);
      }
    };

    fetchAndUpdate();
  }, []);

  return (
    <>
      <MessageOverlay ref={errorRef} active={error != null} title="Błąd" text={error!} noLogo />

      <div style={{ backgroundColor: 'white', height: '500px', width: '800px' }}>
        <DataGrid rows={tests} columns={columns} pageSize={10} localeText={locale} checkboxSelection />
      </div>
    </>
  );
};
