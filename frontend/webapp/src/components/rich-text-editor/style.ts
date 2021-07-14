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
  height: 85%;
  border-radius: 5px;

  .custom-blockquote {
    color: #999;
    font-family: 'Hoefler Text', Georgia, serif;
    font-style: italic;
    text-align: center;
    border-left: 2px solid ${({ theme }) => theme.colors.primary};
    padding: 0.25rem;
    padding-left: 1rem;
    margin: 0 0 0 0.5rem;
  }

  .custome-code {
    background-color: ${({ theme }) => theme.colors.background};
    opacity: 0.7;
    word-wrap: break-word;
    box-decoration-break: clone;
    padding: 0.1rem 0.3rem 0.1rem 0.3rem;
    margin: 0;
  }
`;
