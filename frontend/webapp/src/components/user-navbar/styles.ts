import styled, { css } from 'styled-components';

export const NavBarUser = styled.nav`
  height: 80px;
  display: grid;
  grid-template-columns: 20% 65% minmax(120px, 15%);
  position: sticky;
  top: 0px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 1rem;
  z-index: 999;
  padding-top: 30px;
  padding-left: 30px;

  transition: 0.5s;
`;

export const ButtonSpace = styled.div`
  grid-column: 3/4;
  width: 100%;
  height: 100%;

  transition: 0.5s;
`;

export const Row = styled.div<{ id: string }>`
  width: 100%;
  border-radius: 15px;

  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  font-size: 15px;
  transition: 0.5s;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ id }) =>
    (id === 'profile' &&
      css`
        :hover {
          cursor: pointer;
          background-color: ${({ theme }) => theme.colors.primary};
        }
      `) ||
    (id === 'logout' &&
      css`
        :hover {
          cursor: pointer;
          background: ${({ theme }) => theme.colors.background};
          color: ${({ theme }) => theme.colors.primary};
        }
      `) ||
    css`
      :hover {
        cursor: pointer;
        background: ${({ theme }) => theme.colors.background};

        -webkit-box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.primary};
        -moz-box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.primary};
        box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.primary};
      }
    `}
`;

export const DropDown = styled.div<{ open: boolean }>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Icon = styled.div`
  margin: 0;
  height: 40px;
  flex: 30%;
  display: grid;
  place-items: center;
`;

export const TitleRow = styled.div`
  flex: 70%;
  margin: 0;
`;
