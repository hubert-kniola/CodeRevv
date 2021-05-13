import { FC } from 'react';

import { UserDashboard, UserNavBar } from 'containers';
import { DashContextProvider } from 'context';

const Dashboard: FC = () => {
  return (
    <DashContextProvider>
      <UserNavBar />
      <UserDashboard />
    </DashContextProvider>
  );
};

export default Dashboard;
