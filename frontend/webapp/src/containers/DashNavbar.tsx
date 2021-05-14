import { UserNavbar, SpaceButton, List } from 'components';
import { FC } from 'react';

export const DashNavbar: FC = () => {
  return (
    <UserNavbar>
      <SpaceButton>
        <List />
      </SpaceButton>
    </UserNavbar>
  );
};
