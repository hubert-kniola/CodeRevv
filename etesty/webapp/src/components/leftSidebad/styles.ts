import styled from 'styled-components';

export const Board = styled.div`
  display:grid;
  grid-template-columns: minmax(150px, 15%) 1fr;
  height: 1000px;
`

export const LeftBar = styled.div`
    position: fixed;
    width: 15%;
    max-width: 15%;
    min-width: 150px;
    height: 100%;
    grid-column: 1/2;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.background};;
`

export const MainBoard = styled.div`
    grid-column: 2/3;
`

export const MenuHeader = styled.div`
  width: 100%;
  height: 4em;
  display: grid;
  place-items: center;
`



export const SidebarList = styled.ul`
  height: auto;
  width: 100%;
  padding: 0;
  margin : 0;
`

export const Row = styled.li`
  width:100%;
  height: 50px;
  list-style-type:none;
  margin: 0;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 0;

  :hover{
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary}
  }
`

export const Icon = styled.div`
  margin: 0;
  flex: 20%;
  display: grid;
  place-items: center;
`

export const TitleRow = styled.div`
  flex: 80%;
  margin: 0;
`