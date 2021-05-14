import styled, { css } from 'styled-components';

import plusImg from 'images/open.png';

export const Container = styled.div`
  width: 70vw;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 30px;

  height: max-content;
  margin-bottom: 10px;

  display: flex;
  justify-content: center;

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
  text-align: center;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  display: flex;
  margin-top: 10px;
  width: 500px;
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
  width: 500px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px 15px;
  border: 0px solid transparent;
  border-radius: 15px;
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

export const NewQuestionButton = styled.div`
  width: 500px;
  background: ${({ theme }) => theme.colors.setting};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 15px;

  margin-bottom: 10px;

  display: flex;
  justify-content: center;
  text-align: center;

  &:hover {
    transition: all 0.5s ease-in-out;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

export const PlusIcon = styled.img`
  filter: brightness(0) invert(1);
  height: 20px;
  width: auto;
  user-select: none;
  transition: all 0.1s ease-in-out;

  margin: 15px;

  ${({ theme }) =>
    theme.name === 'light' &&
    css`
      filter: invert(0);
    `}
`;

PlusIcon.defaultProps = {
  alt: 'Add',
  src: plusImg,
};

export const QuestionWithDelete = styled.div`
  display: grid;
  width: 1000px;
  background-color: white;
`;
