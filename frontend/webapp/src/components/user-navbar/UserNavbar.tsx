import { FC, useContext, useRef } from 'react';

import { NavBarUser, ButtonSpace, Row, Icon, TitleRow, DropDown } from './styles';

import { NavBarData, userNavBarData } from 'const';
import { AuthContext, DashContext } from 'context';
import { useOnClickOutside } from 'hooks';

export const List: FC = () => {
  const { authState } = useContext(AuthContext);
  const dashContext = useContext(DashContext);
  const dropDownRef = useRef<HTMLDivElement>(null);

  userNavBarData[0].title = `Cześć, !`; //${authState.userInfo!.name}

  const dataToItem = (item: NavBarData) => (
    <Row onClick={() => item.action(dashContext)} id={item.id}>
      <Icon>{item.icon}</Icon>
      <TitleRow> {item.title} </TitleRow>
    </Row>
  );

  const { navbarOpen, setNavbarOpen } = dashContext;
  const toggleOpen = () => setNavbarOpen(!navbarOpen);

  useOnClickOutside(dropDownRef, () => setNavbarOpen(false));

  return (
    <DropDown ref={dropDownRef} onClick={toggleOpen} open={navbarOpen}>
      {navbarOpen ? userNavBarData.map((item) => dataToItem(item)) : dataToItem(userNavBarData[0])}
    </DropDown>
  );
};

export const SpaceButton: FC = ({ children }) => <ButtonSpace>{children} </ButtonSpace>;

export const UserNavbar: FC = ({ children }) => <NavBarUser>{children}</NavBarUser>;
