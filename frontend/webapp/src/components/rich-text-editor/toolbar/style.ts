import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.background};
  display: fixed;
  padding: 0.5rem;
  justify-content: center;
  border-radius: 15px 15px 0px 0px;
  border: 0px solid ${({ theme }) => theme.colors.lighterBackground};
`;

export const Button = styled.div`
  color: #999;
  cursor: pointer;
  margin: auto;
  display: flex;
  align-items: center;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
