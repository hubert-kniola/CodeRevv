import { useContext } from 'react';

import { Title } from 'components';
import { HomeNav } from 'containers';
import { AuthContext } from 'context';

const Dashboard = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <HomeNav />

      <Title>Witaj, {userInfo.name}!</Title>
    </>
  );
};

export default Dashboard;
