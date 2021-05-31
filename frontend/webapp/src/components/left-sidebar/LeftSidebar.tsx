import { FC, useState, useContext } from 'react';
import { DashContext } from 'context';
import { sidebarData, SidebarItem } from 'const';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { Board, LeftBar, MenuHeader, Row, SidebarList, Icon, TitleRow, SubRow, MainBoard } from './styles';
import { Collapse } from '@material-ui/core';

type Props = {
  item: SidebarItem;
  visible: boolean;
};

export const DropDownList: FC<Props> = ({ item, visible }) => {
  const [open, setOpen] = useState(true);
  const dashContext = useContext(DashContext);

  return (
    <>
      <Row to={item.link} key={item.title} onClick={() => setOpen(!open)}>
        <Icon>{item.icon}</Icon>
        {!visible ? <TitleRow>{item.title}</TitleRow> : null}
      </Row>
      <Collapse in={open}>
        {item.subMenu.map((item) => (
          <SubRow to={item.link} key={item.title} onClick={() => item.action(dashContext)}>
            <Icon>{item.icon}</Icon>
            {!visible && <TitleRow>{item.title}</TitleRow>}
          </SubRow>
        ))}
      </Collapse>
    </>
  );
};

export const LeftSidebar: FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Board open={open}>
      <LeftBar open={open}>
        <MenuHeader onClick={() => setOpen(!open)}>
          {open ? (
            <Icon>
              <MenuOpenIcon />
            </Icon>
          ) : (
            <div style={{ cursor: 'pointer' }}>MENU</div>
          )}
        </MenuHeader>
        <SidebarList>
          {sidebarData.map((item) => (
            <DropDownList item={item} key={item.title} visible={open} />
          ))}
        </SidebarList>
      </LeftBar>
      <MainBoard>{children}</MainBoard>
    </Board>
  );
};
