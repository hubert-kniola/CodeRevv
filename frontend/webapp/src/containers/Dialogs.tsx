import { PopupDialog, PopupDialogBody, PopupDialogBtnGroup, PopupDialogButton, PopupDialogTitle } from 'components';
import { TestFillContext, AuthContext } from 'context';
import { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getTestResults } from 'utility';

type Props = {
  open: boolean;
};

export const TestStartDialog: FC<Props> = ({ open }) => {
  const { test, onTestStart } = useContext(TestFillContext);
  const { logout } = useContext(AuthContext);

  const history = useHistory();

  const handleLeave = () => {
    logout();
    history.push('/dashboard');
  };

  const handleStart = () => {
    onTestStart();
  };

  return (
    <PopupDialog open={open}>
      <PopupDialogTitle>
        Zaraz przystąpisz do rozwiązywania testu "<strong>{test?.testName}</strong>" stworzonego przez użytkownika{' '}
        <strong>
          {test?.creator.name} {test?.creator.surname}
        </strong>
        .
      </PopupDialogTitle>
      <hr />
      <PopupDialogBody>
        Jeśli to nie ty, wyloguj się poniższym przyciskiem. Po rozpoczęciu testu nie będzie możliwości jego ponownego
        uzupełnienia.
      </PopupDialogBody>

      <PopupDialogBtnGroup>
        <PopupDialogButton onClick={handleLeave}>Wyloguj mnie teraz</PopupDialogButton>
        <PopupDialogButton onClick={handleStart} primary>
          Chcę rozpocząć test
        </PopupDialogButton>
      </PopupDialogBtnGroup>
    </PopupDialog>
  );
};

interface TEDProps extends Props {
  onDismiss: () => void;
}

export const TestEndDialog: FC<TEDProps> = ({ open, onDismiss }) => {
  const { test } = useContext(TestFillContext);
  const history = useHistory();

  const handleEnd = async () => {
    const obj = await getTestResults(test!.id);

    console.log({ obj });

    history.push('/dashboard');
  };
  return (
    <PopupDialog open={open}>
      <PopupDialogTitle>
        <strong>Na pewno chcesz zakończyć?</strong>
      </PopupDialogTitle>
      <hr />
      <PopupDialogBody>
        Jeśli zakończysz test nie będzie możliwości jego ponownego uzupełnienia.
        <br />
        Zostaniesz przekierowany na panel użytkownika.
      </PopupDialogBody>

      <PopupDialogBtnGroup>
        <PopupDialogButton onClick={onDismiss}>Wróć do testu</PopupDialogButton>
        <PopupDialogButton onClick={handleEnd} primary>
          Zakończ test
        </PopupDialogButton>
      </PopupDialogBtnGroup>
    </PopupDialog>
  );
};
