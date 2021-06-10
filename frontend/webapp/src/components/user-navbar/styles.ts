import styled, { css } from 'styled-components';

export const NavContainer = styled.div`
  height: 4rem;
  position: sticky;
  top: 0px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem 3rem 2rem 1.5rem;
  z-index: 1000;
  display: flex;

  transition: 0.5s;
`;

export const Row = styled.div<{ id: string }>`
  width: 100%;
  height: 4rem;

  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  font-size: 15px;
  transition: 0.5s;
  cursor: pointer;

  ${({ id }) =>
    (id === 'profile' &&
      css`
        :hover {
          background-color: ${({ theme }) => theme.colors.primary};
        }
      `) ||
    (id === 'logout' &&
      css`
        :hover {
          background: ${({ theme }) => theme.colors.background};
          color: ${({ theme }) => theme.colors.primary};
        }
      `) ||
    css`
      :hover {
        background: ${({ theme }) => theme.colors.background};

        -webkit-box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.primary};
        -moz-box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.primary};
        box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.primary};
      }
    `}
`;

export const UserNav = styled.nav`
  right: 5%;
  top: 0;
  position: absolute;
  width: max-content;
`;

export const DropDown = styled.ul`
  width: 12rem;
  height: max-content;

  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const InlineItem = styled.li`
  margin-left: 0.5rem;
  padding: 0.5rem;
`;
