import { FC, useState, useContext } from 'react';
import { DashContext } from 'context';
import { sidebarData, SidebarItem } from 'const';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { Board, LeftBar, MenuHeader, Row, SidebarList, Icon, TitleRow, SubRow, MainBoard } from './styles';

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
      {open &&
        item.subMenu.map((item) => (
          <SubRow to={item.link} key={item.title} onClick={() => item.action(dashContext)}>
            <Icon>{item.icon}</Icon>
            {!visible && <TitleRow>{item.title}</TitleRow>}
          </SubRow>
        ))}
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
            'MENU'
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
