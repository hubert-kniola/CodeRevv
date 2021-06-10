import { FC, useState, useContext } from 'react';
import { DashContext } from 'context';
import { sidebarData, SidebarItem } from 'const';

import { Board, LeftNav, Row, SidebarList, Icon, TitleRow, SubRow, MainBoard } from './styles';
import { Collapse } from '@material-ui/core';

type Props = {
  item: SidebarItem;
};

export const MenuItemList: FC<Props> = ({ item }) => {
  const [open, setOpen] = useState(true);
  const dashContext = useContext(DashContext);

  return (
    <li>
      <Row to={item.link} key={item.title} onClick={() => setOpen(!open)}>
        <Icon>{item.icon}</Icon>
        <TitleRow>{item.title}</TitleRow>
      </Row>
      <Collapse in={open}>
        {item.subMenu.map((item) => (
          <SubRow to={item.link} key={item.title} onClick={() => item.action(dashContext)}>
            <Icon>{item.icon}</Icon>
            <TitleRow>{item.title}</TitleRow>
          </SubRow>
        ))}
      </Collapse>
    </li>
  );
};

export const MainPanel: FC = ({ children }) => {
  return (
    <Board>
      <LeftNav>
        <SidebarList>
          {sidebarData.map((item) => (
            <MenuItemList item={item} key={item.title} />
          ))}
        </SidebarList>
      </LeftNav>
      <MainBoard>
        <div>{children}</div>
      </MainBoard>
    </Board>
  );
};
