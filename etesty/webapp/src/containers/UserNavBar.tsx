
import { UserNavbar, SpaceButton, List } from 'components'
import { FunctionComponent } from 'react'


export const UserNavBar: FunctionComponent = () =>
{
    return (
        <UserNavbar>
            <SpaceButton>
                <List/>
            </SpaceButton>
        </UserNavbar>
    )
}

export default UserNavBar;