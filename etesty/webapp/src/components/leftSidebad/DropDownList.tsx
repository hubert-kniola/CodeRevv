
import { FunctionComponent, useState } from 'react'
import type { SidebarItem, SubMenu } from './SidebarData'
import { Row, Icon, TitleRow, SubRow } from './styles'

type Props = {
    item: SidebarItem;
    open: boolean;
    key: number;

}

export const DropDownList  :FunctionComponent<Props> = ({item, open, key}) => {
    const [subNav, setSubNav] = useState(false)

    const showSubNav = () :void  => setSubNav(!subNav);
    const doNothing = () :void  => {};
    
    return(
       <>
            <Row key ={key} onClick={!open ? showSubNav : doNothing}>
                <Icon>{item.icon}</Icon>
                {!open ?
                <TitleRow  >{item.title}</TitleRow>
                : null
                }
            </Row>
            {subNav && !open && item.subMenu.map((item, index) =>{
                return(
                    <SubRow key = {index}>
                        <Icon>{item.icon}</Icon>
                        <TitleRow>{item.title}</TitleRow>
                    </SubRow>
                ) 
            } )}
        </>
    )
}

export default DropDownList;