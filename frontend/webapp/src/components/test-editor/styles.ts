import styled from 'styled-components';

export const Container = styled.div`
  width: 80vw;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 30px;

  justify-content: center;
  height: max-content;
  margin-bottom: 10px;
`;

export const Header = styled.h3`
  text-align: center;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  margin-top: 10px;
  width: 50%;
  padding: 15px 15px;
  border: 0px solid transparent;
  background-color: ${({ theme }) => theme.colors.setting};

  border-radius: 15px;
`;

export const Error = styled.h3`
  margin-top: 5px;
  margin-left: 20px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.error};
  text-align: left;
`;

export const Button = styled.button`
  display: block;
  width: 60%;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px 15px;
  border: 0px solid transparent;
  border-radius: 15px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  cursor: pointer;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.setting};
  }
`;
