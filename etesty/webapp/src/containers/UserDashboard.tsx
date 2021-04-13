import { FunctionComponent } from 'react';

import { LeftSidebar } from 'components';

export const UserDashboard: FunctionComponent = ({ children }) => {
  return (
    <>
      <LeftSidebar>{children}</LeftSidebar>
    </>
  );
};
