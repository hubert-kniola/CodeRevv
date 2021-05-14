import { FC, useContext } from 'react';

import { UserDashboard } from 'containers';
import { AuthContext, DashContextProvider } from 'context';

const Dashboard: FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <DashContextProvider logoutCallback={logout}>
      <UserDashboard />
    </DashContextProvider>
  );
};

export default Dashboard;
