import { FC } from 'react';

import { UserDashboard, UserNavBar } from 'containers';
import { PythonEditor } from 'components';

const Dashboard: FC = () => {
  return (
    <>
      <UserNavBar />
      <UserDashboard>
        <PythonEditor name='python'/>
      </UserDashboard>
    </>
  );
};

export default Dashboard;
