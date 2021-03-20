import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 0 56px;
  height: 500px;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    text-align: center;
    justify-content: center;
  }

  @media (max-width: 1000px) {
    margin: 0 30px;
  }
`;

export const Text = styled.a`
  color: ${({ theme }) => theme.colors.white};
  font-size: 5vw;

  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;
