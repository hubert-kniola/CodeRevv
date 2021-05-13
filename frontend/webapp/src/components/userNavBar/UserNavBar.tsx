import { FunctionComponent, useContext, useState } from 'react';
import { NavBarUser, ButtonSpace, Row, Icon, TitleRow, DropDown } from './style';

import { NavBarData, userNavBarData } from 'const';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'context';

type ClickMapper = {
  default: () => void;
  [x: string]: () => void;
};

const dataToItem = (item: NavBarData, clicks: ClickMapper) => {
  const choice = clicks[item.id] || clicks.default;

  return (
    <Row onClick={choice} title={item.title}>
      <Icon>{item.icon}</Icon>
      <TitleRow> {item.title} </TitleRow>
    </Row>
  );
};

export const List: FunctionComponent = () => {
  const [open, setOpen] = useState(true);

  const authContext = useContext(AuthContext);
  const history = useHistory();

  const toggleOpen = () => setOpen(!open);

  const logOutClick = () => {
    authContext.logout();
    history.push('/');
  };

  //TODO context rework

  const clickMap: ClickMapper = { logout: logOutClick, default: toggleOpen };

  return (
    <DropDown onClick={toggleOpen} open={open}>
      {!open ? userNavBarData.map((item) => dataToItem(item, clickMap)) : dataToItem(userNavBarData[0], clickMap)}
    </DropDown>
  );
};

export const SpaceButton: FunctionComponent = ({ children }) => <ButtonSpace>{children} </ButtonSpace>;

export const UserNavbar: FunctionComponent = ({ children }) => <NavBarUser>{children}</NavBarUser>;
