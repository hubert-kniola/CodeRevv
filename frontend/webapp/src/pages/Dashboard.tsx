import { FunctionComponent, useContext } from 'react';

import { UserDashboard, UserNavBar } from 'containers';
import { Title, PythonEditor } from 'components';
import { AuthContext } from 'context';

const Dashboard: FunctionComponent = () => {
  const authContext = useContext(AuthContext);
  const { userInfo } = authContext.authState;

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
