import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 50%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem auto;
  padding: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.lighterBackground};
  border-radius: 15px;
`;

export const Container = styled.div`
  width: 100%;
  margin: 0;
  height: 100%;
`;

export const Space = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.lighterBackground};
  height: 85%;

`;
