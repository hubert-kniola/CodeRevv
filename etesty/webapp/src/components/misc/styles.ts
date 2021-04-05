import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CenteredContainer = styled.div`
  display: grid;
  place-items: center;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
