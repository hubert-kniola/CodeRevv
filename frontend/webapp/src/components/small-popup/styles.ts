import styled from 'styled-components';

export const Popup = styled.div<{ show: boolean }>`
  height: max-content;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 500px;
  padding: 0.5rem 1rem 0.5rem 1rem;
  white-space: pre-wrap;
  z-index: 99998;
  transform: ${({ show }) => (show ? ' translatey(0%);' : 'translatey(300%)')};
  transition: transform 0.3s ease-out;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 8px 14px 4px #000000;

  & a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
