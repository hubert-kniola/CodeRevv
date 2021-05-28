import { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import { AuthContext, TestFillContext } from 'context';

type Props = {
  open: boolean;
};

export const TestEndDialog: FC<Props> = ({ open }) => {
  const { authState, logout } = useContext(AuthContext);
  const { test, onTestStart } = useContext(TestFillContext);

  const history = useHistory();

  const handleLeave = () => {
    logout();
    history.push('/dashboard');
  };

  const handleStart = () => {
    onTestStart();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        Jesteś zalogowany jako użytkownik{' '}
        <strong>
          {authState.userInfo?.name} {authState.userInfo?.surname}
        </strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            Zaraz przystąpisz do rozwiązywania testu <strong>{test?.testName}</strong> stworzonego przez użytkownika{' '}
            <strong>{test?.creatorId}</strong>.
          </div>
          <hr />
          <div>
            Jeśli to nie ty, wyloguj się poniższym przyciskiem. Po rozpoczęciu testu nie będzie możliwości jego
            ponownego uzupełnienia.
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLeave} color="secondary">
          Wyloguj mnie teraz
        </Button>
        <Button onClick={handleStart} color="primary" autoFocus>
          Chcę rozpocząć test
        </Button>
      </DialogActions>
    </Dialog>
  );
};
