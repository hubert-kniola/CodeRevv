import styled from 'styled-components';

export const MonacoFixer = styled.div`
  text-align: left;
  font-size: 10px;
`;

export const Container = styled.div<{ error: boolean }>`
  min-width: 500px;
  max-width: 900px;
  width: 95%;
  margin: 0.3rem auto;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  border: ${({ error }) => (error ? '2px solid #f53030' : '2px solid #1f1f1f')};
  height: auto;
  transition: all 1s ease;
  box-shadow: 0px 8px 14px 4px #000000;
`;

export const RunButton = styled.button`
  width: 100%;
  padding: 10px 10px;
  border: 0px solid transparent;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  margin: 1rem auto;
  cursor: pointer;
  box-shadow: 0px 8px 14px 4px #000000;
  outline: none;
  transition: 0.2s ease-in-out;

  &:hover {
    transition: 0.2s ease-in-out;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.setting};
  }
`;
