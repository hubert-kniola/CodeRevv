import { FunctionComponent, useContext } from 'react';

import { UserDashboard, UserNavBar } from 'containers';
import { AuthContext } from 'context';

const Dashboard: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const { userInfo } = authContext.authState;

  return (
    <>
      <UserNavBar/>
      <UserDashboard/>

    </>
  );
};

export default Dashboard;