import styled from 'styled-components';

export const Container = styled.div`
  width: 80vw;
  height: 500px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 30px;
`;
