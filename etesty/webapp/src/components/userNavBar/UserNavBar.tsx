import { Button } from "components/navbar/styles";
import {  FunctionComponent, useState } from "react";
import {
    NavBarUser, 
    ButtonSpace, 
    UserMenu, 
    Row, 
    Icon, 
    TitleRow, 
    DropDown, 
    SubOption,
    LogOut
} from './style'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import EditIcon from '@material-ui/icons/Edit';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import ErrorIcon from '@material-ui/icons/Error';


export const UserNavbar: FunctionComponent = () =>{
    const [open, setOpen] = useState(true)

    const openIt = () =>{
        setOpen(!open)

    }
    return (
        <NavBarUser>
            <ButtonSpace>
                {
                    open ? 
                    <UserMenu onClick={openIt}>
                        <Icon><EmojiEmotionsIcon/></Icon>
                        <TitleRow> Mój profil </TitleRow>
                    </UserMenu> 
                    : 
                    <DropDown onClick={openIt}>
                        <Row >
                            <Icon><EmojiEmotionsIcon/></Icon>
                            <TitleRow> Mój profil </TitleRow>
                        </Row>
                        <SubOption>
                            <Icon><EditIcon/></Icon>
                            <TitleRow> Edytuj profil </TitleRow>
                        </SubOption>
                        <SubOption>
                            <Icon><ErrorIcon/></Icon>
                            <TitleRow> Opcja </TitleRow>
                        </SubOption>
                        <LogOut>
                            <Icon><DirectionsWalkIcon/></Icon>
                            <TitleRow> Wyloguj </TitleRow>
                        </LogOut>
                    </DropDown>
                }
            </ButtonSpace>
        </NavBarUser>
    )
}


