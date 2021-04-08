import { FunctionComponent, useState } from 'react'
import { Board, LeftBar, MainBoard, MenuHeader,Row, SidebarList,Icon, TitleRow } from './styles'
import { SidebarData } from './SidebarData'

export const LeftSidebar: FunctionComponent = () =>{
    const [open, setOpen] = useState(true);

    return(
    <Board>
        <LeftBar>
            <MenuHeader onClick = {()=>setOpen(!open)}>
                MENU
            </MenuHeader>
            {
                open ? 
                <SidebarList>
                {
                    SidebarData.map((val: any, key: any) =>{
                        return(
                            <Row key = {key} >
                                <Icon>{val.icon}</Icon>
                                <TitleRow>{val.title}</TitleRow>
                            </Row>
                        )
                    })
                }
            </SidebarList> 
            :
            <SidebarList>
            {
                SidebarData.map((val: any, key: any) =>{
                    return(
                        <Row key = {key} >
                            <Icon>{val.icon}</Icon>
                        </Row>
                    )
                })
            }
        </SidebarList>
            }
        </LeftBar>
        <MainBoard>MainBoard</MainBoard>
    </Board>
    );
};