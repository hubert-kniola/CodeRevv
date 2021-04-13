import { FunctionComponent } from 'react';

import { UserDashboard, UserNavBar } from 'containers';

const Dashboard: FunctionComponent = () => {
  return (
    <>
      <UserNavBar />
      <UserDashboard />
    </>
  );
};

export default Dashboard;
