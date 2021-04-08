import { FunctionComponent, useState } from 'react'
import { Board, LeftBar, MainBoard, MenuHeader,Row, SidebarList,Icon, TitleRow } from './styles'
import { SidebarData } from './SidebarData'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import type { SidebarItem } from './SidebarData'
export const LeftSidebar: FunctionComponent = () =>{
    const [open, setOpen] = useState(true);

    return(
    <Board open= {open}>
        <LeftBar open = {open}>
            <MenuHeader onClick = {()=>setOpen(!open)}>
                {open ?  
                    <Icon> <MenuOpenIcon /></Icon> 
                    : 'MENU' 
                }
            </MenuHeader>
                <SidebarList>
                {
                    SidebarData.map((val: SidebarItem, key: number) =>{
                        return(
                            <Row key = {key} >
                                <Icon>{val.icon}</Icon>
                                {!open ?
                                <TitleRow>{val.title}</TitleRow>
                                :<></>
                                }
                            </Row>
                        )
                    })
                }
            </SidebarList> 
        </LeftBar>
        <MainBoard>MainBoard</MainBoard>
    </Board>
    );
};