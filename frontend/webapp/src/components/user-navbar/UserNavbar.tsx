import { FunctionComponent, useContext } from 'react';
import { NavBarUser, ButtonSpace, Row, Icon, TitleRow, DropDown } from './style';

import { NavBarData, userNavBarData } from 'const';
import { AuthContext, DashContext } from 'context';

export const List: FunctionComponent = () => {
  const { authState } = useContext(AuthContext);
  const dashContext = useContext(DashContext);

  userNavBarData[0].title = `Cześć, ${authState.userInfo!.name}!`;

  const dataToItem = (item: NavBarData) => (
    <Row onClick={() => item.action(dashContext)} id={item.id}>
      <Icon>{item.icon}</Icon>
      <TitleRow> {item.title} </TitleRow>
    </Row>
  );

  const { navbarOpen, setNavbarOpen } = dashContext;
  const toggleOpen = () => setNavbarOpen(!navbarOpen);

  return (
    <DropDown onClick={toggleOpen} open={navbarOpen}>
      {navbarOpen ? userNavBarData.map((item) => dataToItem(item)) : dataToItem(userNavBarData[0])}
    </DropDown>
  );
};

export const SpaceButton: FunctionComponent = ({ children }) => <ButtonSpace>{children} </ButtonSpace>;

export const UserNavbar: FunctionComponent = ({ children }) => <NavBarUser>{children}</NavBarUser>;
