import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.setting};
  padding: 10px 22px;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;

  &:hover {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.setting};
  }
`;