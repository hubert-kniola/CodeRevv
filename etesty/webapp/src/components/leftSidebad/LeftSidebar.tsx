import { FunctionComponent, useState } from 'react'
import { Board, LeftBar, MainBoard, MenuHeader,Row, SidebarList,Icon, TitleRow } from './styles'
import { SidebarData } from './SidebarData'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import type { SidebarItem, SubMenu } from './SidebarData'
import DropDownList from './DropDownList'
import { validateLocaleAndSetLanguage } from 'typescript';



export const LeftSidebar: FunctionComponent = () =>{
    const [open, setOpen] = useState(false);

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
                SidebarData.map((item: SidebarItem, key: number) =>{
                    return <DropDownList item = {item} open={open} key= {key}/>
                    
                })
            }
            </SidebarList>
        </LeftBar>
        <MainBoard>MainBoard</MainBoard>
    </Board>
    );
};