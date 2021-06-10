import { FC, useContext, useRef } from 'react';

import { NavContainer, Row, InlineItem, DropDown, UserNav } from './styles';

import { NavBarData, userNavBarData } from 'const';
import { AuthContext, DashContext } from 'context';
import { ThemeSwitch } from 'components';
import { Collapse } from '@material-ui/core';

export const DropDownMenuNav: FC = () => {
  const { authState } = useContext(AuthContext);
  const dashContext = useContext(DashContext);
  const { isNavbarOpen, toggleNavbar } = dashContext;

  userNavBarData[0].title = `Cześć, ${authState.userInfo?.name}!`;

  const dataToJsx = (item: NavBarData) => (
    <Row onClick={() => item.action(dashContext)} id={item.id}>
      <InlineItem>{item.icon}</InlineItem>
      <InlineItem> {item.title} </InlineItem>
    </Row>
  );

  const head = userNavBarData[0];

  return (
    <DropDown onMouseEnter={() => toggleNavbar()} onMouseLeave={() => toggleNavbar()}>
      <Row id={head.id}>
        <InlineItem>{head.icon}</InlineItem>
        <InlineItem> {head.title} </InlineItem>
      </Row>
      <Collapse in={isNavbarOpen}>{userNavBarData.slice(1).map(dataToJsx)}</Collapse>
    </DropDown>
  );
};

export const UserNavbar: FC = () => (
  <NavContainer>
    <ThemeSwitch />

    <UserNav>
      <DropDownMenuNav />
    </UserNav>
  </NavContainer>
);
