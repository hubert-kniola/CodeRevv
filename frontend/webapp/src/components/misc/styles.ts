import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const CenteredContainer = styled.div`
  display: grid;
  place-items: center;
`;

export const StyledLink = styled(Link)<{ big?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  ${({ big }) =>
    big != null &&
    big &&
    css`
      font-size: 2rem;
    `}

  &:hover {
    transition: all 0.2s ease-in-out;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
