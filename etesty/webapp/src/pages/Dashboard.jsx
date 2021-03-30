import { useContext } from 'react';

import { Title } from 'components';
import { HomeNav } from 'containers';
import { AuthContext } from 'context';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { userInfo } = authContext.authState;

  return (
    <>
      <HomeNav />

      <Title>Witaj, {userInfo.name}!</Title>
    </>
  );
};

export default Dashboard;
