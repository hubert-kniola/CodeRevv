import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Board = styled.div<{ open: boolean }>`
  user-select: none;
  display: grid;
  grid-template-columns: minmax(150px, 15%) 1fr;
  height: 1000px;

  ${({ open }) =>
    open &&
    css`
      grid-template-columns: minmax(50px, 5%) 1fr;
    `}

  ${({ open }) =>
    !open &&
    css`
      grid-template-columns: minmax(150px, 15%) 1fr;
      transition: 1s;
    `}
`;

export const LeftBar = styled.div<{ open: boolean }>`
  position: fixed;
  grid-column: 1/2;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;

  ${({ open }) =>
    !open &&
    css`
      width: 15%;
      max-width: 15%;
      min-width: 150px;
    `}

  ${({ open }) =>
    open &&
    css`
      width: 5%;
      max-width: 5%;
      min-width: 50px;
    `}
`;

export const MenuHeader = styled.div`
  width: 100%;
  height: 4em;
  display: grid;
  place-items: center;
`;

export const SidebarList = styled.ul`
  height: auto;
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const Row = styled(NavLink)`
  width: 100%;
  height: 50px;
  text-decoration: none;
  margin: 0;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 0;
  transition: 0.5s;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SubRow = styled.li`
  width: 100%;
  height: 50px;
  list-style-type: none;
  margin: 0;
  float: right;
  display: flex;
  border-left: 5px ${({ theme }) => theme.colors.setting};
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.lighterBackgound};
  justify-content: left;
  align-items: center;
  font-size: 15px;
  padding: 0;
  transition: 0.3s;

  :hover {
    cursor: pointer;
    border-left: 5px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const Icon = styled.div`
  margin: 0;
  flex: 25%;
  display: grid;
  place-items: center;
`;

export const TitleRow = styled.div`
  flex: 75%;
  margin: 0;
`;

export const MainBoard = styled.div`
  grid-column: 2/3;
`;
