import { FC, useContext } from 'react';

import { LeftSidebar } from 'components';
import { DashContext } from 'context';

import { DashNavbar, TestCreator, UserFeed } from 'containers';

export const UserDashboard: FC = () => {
  const { mode } = useContext(DashContext);

  let MainComponent: FC;

  if (mode === 'newtest') {
    MainComponent = TestCreator;
  } else {
    MainComponent = UserFeed;
  }

  return (
    <>
      <DashNavbar />

      <LeftSidebar>
        <MainComponent />
      </LeftSidebar>
    </>
  );
};
