import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 30vh;
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
  color: ${({ theme }) => theme.colors.text};
  font-size: 70px;

  @media (max-width: 600px) {
    font-size: 55px;
  }

  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;
