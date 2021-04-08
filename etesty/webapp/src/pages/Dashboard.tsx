import { FunctionComponent, useContext } from 'react';

import { HomeNav, UserDashboard } from 'containers';
import { AuthContext } from 'context';

const Dashboard: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const { userInfo } = authContext.authState;

  return (
    <>
      <HomeNav />
      <UserDashboard/>

    </>
  );
};

export default Dashboard;