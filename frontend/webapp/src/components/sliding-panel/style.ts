import styled from 'styled-components';

export const Panel = styled.div<{ show: boolean }>`
  height: 80%;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 99998;
  transform: ${({ show }) => (show ? ' translatey(30%);' : 'translatey(200%)')};
  transition: transform 0.3s ease-out;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterBackground};

  hr {
    width: 70%;
    margin: 1rem auto;
  }

  .ico {
    font-size: 32px;
    transition: 0.5s all ease-in-out;
    cursor: pointer;
    :hover {
      transform: scale(1.5);
    }
  }
`;

export const HeaderContainer = styled.div`
  display: fixed;
  justify-content: space-between;
  text-align: center;

  & p {
    font-size: 30px;
    color: ${({ theme }) => theme.colors.text};
    margin: auto;
  }
`;
