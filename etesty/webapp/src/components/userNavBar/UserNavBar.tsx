import { FunctionComponent, useState } from "react";
import {
    NavBarUser, 
    ButtonSpace, 
    Row, 
    Icon, 
    TitleRow, 
    DropDown, 
} from './style'

import {Data, userNavBarData} from './userNavBarData'


export const Item = (item: Data, click?: () => void) =>(
    <Row title = {item.title}>
        <Icon>{item.icon}</Icon>
        <TitleRow> {item.title} </TitleRow>
    </Row>
)

export const List : FunctionComponent = () =>{
    const [open, setOpen] = useState(true)
    const openIt = () =>{
        setOpen(!open)
    }

    return(
        <DropDown onClick={openIt} open = {open}>
        {
            !open ? 
                userNavBarData.map((item) => {
                    return Item(item, openIt);
                })    
                :
            Item(userNavBarData[0])
            }
        </DropDown>
    )
}

export const SpaceButton : FunctionComponent = ({children}) => <ButtonSpace>{children} </ButtonSpace>

export const UserNavbar: FunctionComponent = ({children}) =><NavBarUser>{children}</NavBarUser>



