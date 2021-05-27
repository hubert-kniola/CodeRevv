import styled from 'styled-components';

export const Panel = styled.div<{ show: boolean }>`
  height: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  z-index: 99998;
  transform: ${({ show }) => (show ? ' translateX(0);' : 'translateX(100%)')};
  transition: transform 0.3s ease-out;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterBackgound};

  .ico {
    font-size: 32px;
    transition: 0.5s all ease-in-out;
    cursor: pointer;
    :hover {
      transform: scale(1.5);
    }
  }
`;
