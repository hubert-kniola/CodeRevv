import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Board = styled.div`
  user-select: none;
  display: flex;
  z-index: 999;
`;

export const LeftNav = styled.nav`
  width: 4rem;
  height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  position: fixed;
  z-index: 999;

  transition: 0.5s;

  @media only screen and (min-width: 800px) {
    :hover {
      width: 16rem;
    }
  }
`;

export const MenuHeader = styled.div`
  width: 100%;
  height: 4em;
  display: grid;
  place-items: center;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

export const Row = styled(NavLink)`
  width: 100%;
  height: 4rem;
  text-decoration: none;
  margin: 0;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  font-size: 15px;
  padding: 0;
  transition: 0.5s;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SubRow = styled(NavLink)`
  width: 100%;
  height: 4rem;
  list-style-type: none;
  margin: 0;
  float: right;
  display: flex;
  border-left: 5px ${({ theme }) => theme.colors.setting};
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.lighterBackground};
  justify-content: left;
  align-items: center;
  font-size: 15px;
  padding: 0;
  transition: 0.3s;
  text-decoration: none;

  :hover {
    cursor: pointer;
    border-left: 5px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const Icon = styled.div`
  margin: 0;
  padding: 0 1.3rem;
  cursor: pointer;
`;

export const TitleRow = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 1rem;
`;

export const MainBoard = styled.div`
  margin-top: 5rem;
  margin-left: 5rem;
  width: 100%;

  div::first-of-type {
    width: auto;
    margin: auto;
  }
`;
