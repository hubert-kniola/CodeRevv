import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 50%;
  min-width: 400px;
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
  height: 75%;
  overflow: auto;
  border-radius: 5px;
  box-shadow: inset 0px 1px 8px 0px ${({ theme }) => theme.colors.background};;

  .custome-code {
    background-color: ${({ theme }) => theme.colors.background};
    border-left: 2px solid ${({ theme }) => theme.colors.primary};
    opacity: 0.7;
    word-wrap: break-word;
    box-decoration-break: clone;
    padding: 0.1rem 0.3rem 0.1rem 1rem;
    box-shadow: inset 0px 1px 20px 20px ${({ theme }) => theme.colors.background};
    margin: 0;
  }
`;

export const Span = styled.span`
  color: green;

  :hover{
    color: red;
  }
`
