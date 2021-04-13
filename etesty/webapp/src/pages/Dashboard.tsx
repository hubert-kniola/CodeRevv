import { FunctionComponent, useContext } from 'react';

import { UserDashboard, UserNavBar } from 'containers';
import { Title } from 'components';
import { AuthContext } from 'context';

const Dashboard: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const { userInfo } = authContext.authState;

  return (
    <>
      <UserNavBar />
      <UserDashboard>
        <Title>Cześć, {userInfo?.name}!</Title>
      </UserDashboard>
    </>
  );
};

export default Dashboard;
