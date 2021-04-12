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

export const Row = styled.div<{title: string}>`
  width:100%;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  margin: auto;
  font-size: 15px;
  padding: 0;

  :hover{
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary}
  }

  ${({ title }) =>
    (title === "Mój profil" &&
      css`
        transition: 0.5s;
          :hover{
            cursor: pointer;
            background-color: ${({ theme }) => theme.colors.primary}
          }
      `) || (title === "Wyloguj" &&
      css`
        transition: 0.5s;
         :hover{
          cursor: pointer;
          background:  ${({ theme }) => theme.colors.background};
          color: ${({ theme }) => theme.colors.primary};

      }`) || 
      css`
        :hover{
            cursor: pointer;
            background:  ${({ theme }) => theme.colors.background};
            border: 1px solid ${({ theme }) => theme.colors.primary};
          }
      `}

`
export const UserMenu = styled(Row)`

  transition: 0.5s;

`

export const DropDown = styled.div<{open: boolean}>`
  width: 100%;
  background-color:   ${({ theme }) => theme.colors.background};
  
  ${({ open }) =>
    ( !open &&
      css`
        margin-top: 15px;
        border: 1px solid ${({ theme }) => theme.colors.lighterBackgound};
      `)} 


  `

export const Icon = styled.div`
  margin: 0;
  height: 40px;
  flex: 30%;
  display: grid;
  place-items: center;
`

export const TitleRow = styled.div`
  flex: 70%;
  margin: 0;
`




