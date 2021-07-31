import styled from 'styled-components';

export const Wrapper = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width ? width: '50%'};
  min-width: 400px;
  height: 300px;
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

export const Space = styled.div<{ width?: string; autoHeight?: boolean }>`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.lighterBackground};
  height: ${({ autoHeight }) => (autoHeight ? 'auto' : '80%')};
  width: ${({ width }) => width && width};
  overflow: auto;
  border-radius: 5px;
  box-shadow: inset 0px 1px 8px 0px ${({ theme }) => theme.colors.background};

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

  ::-webkit-scrollbar {
    width: 0.15rem;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background}
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary}
  }
`;

export const Span = styled.span`
  color: green;

  :hover {
    color: red;
  }
`;
