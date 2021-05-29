import styled from 'styled-components'

export const Popup = styled.div<{show:boolean}>`
  height: 7%;
  background-color: white;
  position: fixed;
  right: 1.5rem;
  bottom: 1,5rem;
  width: 15%;
  z-index: 99998;
  transform: ${({ show }) => (show ? ' translatey(150%);' : 'translatey(300%)')};
  transition: transform 0.3s ease-out;
  padding: 1rem;
  background-color: #69D62F;
  padding: 1rem auto;
  border-radius: 15px;
  text-align: center;
  align-items: center;
`