import { UserNavbar, SpaceButton, List, ThemeSwitch } from 'components';
import { FC } from 'react';

export const DashNavbar: FC = () => {
  return (
    <UserNavbar>
      <ThemeSwitch />

      <SpaceButton>
        <List />
      </SpaceButton>
    </UserNavbar>
  );
};
