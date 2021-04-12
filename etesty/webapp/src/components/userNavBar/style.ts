import { NavLink } from 'react-router-dom';
import styled,{ css } from 'styled-components';

export const NavBarUser = styled.nav`
  height: 70px;
  display: grid;
  grid-template-columns: 20% 65% minmax(120px, 15%);
  position: sticky;
  top: 0px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 1rem;
`

export const ButtonSpace  = styled.div`
  grid-column: 3/4;
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div`
  width:100%;
  height: 40px;
  text-decoration: none;
  margin: 0;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 0;

  :hover{
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary}
  }

`
export const UserMenu = styled(Row)`

  transition: 0.5s;

`

export const DropDown = styled.div`
  width: 100%;
  margin-top: 15px;
  background-color:   ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.lighterBackgound};
  
  `

export const Icon = styled.div`
  margin: 0;
  flex: 30%;
  display: grid;
  place-items: center;
`

export const TitleRow = styled.div`
  flex: 70%;
  margin: 0;
`

export const SubOption = styled(Row)`

  :hover{

    background:  ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`

export const LogOut = styled(SubOption)`
  transition: 0.5s;
  :hover{
    color: ${({ theme }) => theme.colors.primary}
  }
`



