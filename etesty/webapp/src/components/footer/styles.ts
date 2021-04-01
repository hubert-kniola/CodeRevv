import styled from 'styled-components';

export const FooterPad = styled.div`
  padding-top: 35vh;
`;

export const Background = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  min-height: 20vh;
`;

export const Container = styled.div`
  display: flex;
  padding: 70px 0;
  margin: auto;
  max-width: 1200px;
  flex-direction: column;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 15px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  font-size: 13px;
  text-decoration: none;
`;

export const Title = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;
`;

export const Text = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;
`;

export const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;
