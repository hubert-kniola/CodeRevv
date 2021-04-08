import { FunctionComponent } from 'react'
import { Board, LeftBar, MainBoard, MenuHeader,Row, SidebarList,Icon, TitleRow } from './styles'
import { SidebarData } from './SidebarData'

export const LeftSidebar: FunctionComponent = () =>(
    <Board>
        <LeftBar>
            <MenuHeader>
                MENU
            </MenuHeader>
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
        </LeftBar>
        <MainBoard>MainBoard</MainBoard>
    </Board>
);