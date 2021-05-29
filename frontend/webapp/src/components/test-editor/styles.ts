import styled from 'styled-components';

export const Container = styled.div`
  width: min(80vw, 1000px);
  background: ${({ theme }) => theme.colors.background};
  border-radius: 30px;
  height: max-content;
  margin: 1rem auto;
  padding-top: 15px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 8px 14px 4px #000000;

  hr {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 400px;
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    text-align: center;
  }

  input,
  select,
  textarea {
    color: ${({ theme }) => theme.colors.text};
  }

  textarea:focus,
  input:focus {
    color: ${({ theme }) => theme.colors.text};
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.setting};
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const Header = styled.h3`
  margin-top: 15px;
  text-align: center;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CenteringContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  display: flex;
  width: 500px;
  padding: 15px 15px;
  border: 0px solid transparent;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.setting};
  box-shadow: 0px 8px 14px 4px #000000;
  outline: none;
`;

export const Error = styled.h3`
  display: flex;
  margin-left: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.error};
  text-align: left;
`;

export const Button = styled.button`
  width: 500px;
  padding: 10px 15px;
  border: 0px solid transparent;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 8px 14px 4px #000000;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.setting};
  }
`;

export const NewQuestionButton = styled.div`
  width: 500px;
  background: ${({ theme }) => theme.colors.setting};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 15px;
  margin: 2rem auto 0;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  box-shadow: 0px 8px 14px 4px #000000;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

export const QuestionContainer = styled.div`
  margin: 0;
  justify-content: center;
`;
