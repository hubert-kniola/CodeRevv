import styled, { css } from 'styled-components';

import plusImg from 'images/open.png';

export const Container = styled.div`
  width: min(80vw, 1000px);
  background: ${({ theme }) => theme.colors.background};
  border-radius: 30px;
  height: max-content;
  margin-bottom: 10px;
  padding-top: 15px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;

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
  width: 500px;
  padding: 15px 15px;
  border: 0px solid transparent;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.setting};
`;

export const Error = styled.h3`
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
  padding-top: 10px;
  padding-bottom: 10px;
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
  filter: invert(1);
  height: 20px;
  display: inline-block;
  user-select: none;

  transition: all 0.1s ease-in-out;
  margin-right: 15px;

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

export const RemoveIcon = styled.img`
  filter: invert(1);
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);

  height: 30px;
  position: sticky;
  margin-top: 0;
  margin-left: 50px;
  display: inline-block;

  ${({ theme }) =>
    theme.name === 'light' &&
    css`
      filter: invert(0);
    `}

  &:hover {
    cursor: pointer;
  }
`;

RemoveIcon.defaultProps = {
  alt: 'Remove',
  src: plusImg,
};

export const QuestionWithDelete = styled.div`
  margin: 40px;
  display: flex;
  justify-content: center;
`;
