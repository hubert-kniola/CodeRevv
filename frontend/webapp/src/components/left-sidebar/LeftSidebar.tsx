import { FunctionComponent, useState, useContext } from 'react';
import { Board, LeftBar, MenuHeader, Row, SidebarList, Icon, TitleRow, SubRow, MainBoard } from './styles';
import { sidebarData, SidebarItem } from 'const';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { DashContext } from 'context';

type Props = {
  item: SidebarItem;
  open: boolean;
  key: number;
};

export const DropDownList: FunctionComponent<Props> = ({ item, open, key }) => {
  const [subNav, setSubNav] = useState(false);
  const dashContext = useContext(DashContext);

  const showSubNav = (): void => setSubNav(!subNav);
  const doNothing = (): void => {};

  return (
    <>
      <Row to={item.link} key={key} onClick={!open ? showSubNav : doNothing}>
        <Icon>{item.icon}</Icon>
        {!open ? <TitleRow>{item.title}</TitleRow> : null}
      </Row>
      {subNav &&
        !open &&
        item.subMenu.map((item, index) => {
          return (
            <SubRow key={index} onClick={() => item.action(dashContext)}>
              <Icon>{item.icon}</Icon>
              <TitleRow>{item.title}</TitleRow>
            </SubRow>
          );
        })}
    </>
  );
};

export const LeftSidebar: FunctionComponent = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Board open={open}>
      <LeftBar open={open}>
        <MenuHeader onClick={() => setOpen(!open)}>
          {open ? (
            <Icon>
              {' '}
              <MenuOpenIcon />
            </Icon>
          ) : (
            'MENU'
          )}
        </MenuHeader>
        <SidebarList>
          {sidebarData.map((item: SidebarItem, key: number) => (
            <DropDownList item={item} open={open} key={key} />
          ))}
        </SidebarList>
      </LeftBar>
      <MainBoard>{children}</MainBoard>
    </Board>
  );
};
