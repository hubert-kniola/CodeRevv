import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Container = styled.nav`
  height: 80px;
  display: flex;
  position: sticky;
  top: 0px;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;


  ${({ scroll }) => (scroll && css`
    background-color: ${({ theme }) => theme.colors.black};
    transition: all 0.5s ease-in-out;
  `) || css`
    background-color: none;
    transition: all 0.4s ease-in-out;
  `}
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
`;

export const ButtonMenu = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

export const Link = styled(NavLink)`
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

  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.colors.orange};
    `}
`;

export const Button = styled(NavLink)`
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

Logo.defaultProps = { alt: 'logo' }
