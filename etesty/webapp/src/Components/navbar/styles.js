import { NavLink as Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Nav = styled.nav`
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: ${({ theme }) => theme.colors.yellow};
  }

  ${({ active }) => active && css`
    color: ${({theme}) => theme.colors.orange};
  `}
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.orange};
  padding: 10px 22px;
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const Logo = styled.img`
  height: 5rem;
  pointer-events: none;
`;