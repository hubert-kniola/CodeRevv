import { FC, useContext, useEffect } from 'react';

import { UserDashboard } from 'containers';
import { AuthContext, DashContextProvider } from 'context';

const Dashboard: FC = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    document.title = `Panel użytkownika`;
  }, []);

  return (
    <DashContextProvider logoutCallback={logout}>
      <UserDashboard />
    </DashContextProvider>
  );
};

export default Dashboard;
