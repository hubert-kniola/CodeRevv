import styled from 'styled-components';

export const Container = styled.div<{ height?: string }>`
  width: 100%;
  margin: 0;
  height: ${({ height }) => (height ? height : '50px')};
  background-color: ${({ theme }) => theme.colors.background};
  display: fixed;
  padding: 0.5rem;
  justify-content: center;
  border-radius: 15px 15px 0px 0px;
  border: 0px solid ${({ theme }) => theme.colors.lighterBackground};

  .additional-function {
    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Button = styled.div`
  color: #999;
  cursor: pointer;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 0;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

`;

export const Color = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border: 2px solid ${({ color }) => color};
  width: 15px;
  min-height: 15px;
  cursor: pointer;
  margin: auto;
  display: flex;
  align-items: center;

  &.active {
    border-color: ${({ theme }) => theme.colors.text};
  }

  :hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

export const Span = styled.span<{ color: string }>`
  :hover {
    color: ${({ color }) => color};
  }
  .active {
    color: ${({ color }) => color};
  }
`;
