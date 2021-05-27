import styled, { css } from 'styled-components';

export const QuestionContainer = styled.div<{ error: boolean }>`
  min-width: 500px;
  max-width: 900px;
  width: 95%;
  margin: 0.3rem auto;
  padding: 1rem;
  background-color: #1f1f1f;
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  border: ${({ error }) => (error ? '2px solid #f53030' : '2px solid #1f1f1f')};
  height: auto;
  transition: all 1s ease;

  & label {
    display: block;
    font-size: 24px;
    margin: 5px auto 15px auto;
    text-align: left;
    font-weight: bold;
  }

  & .text-editor {
    border-radius: 0 15px 15px 15px;
    text-align: left;
    color: black;
    background-color: ${({ theme }) => theme.colors.text};
  }

  & select {
    color: black;
  }
`;

export const GeneralQuestion = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};

  & .test {
    width: 50%;
    text-align: left;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text};

    max-height: 40px;

    & .deleteOverlay {
      max-height: 30px;
      font-size: 14px;
      margin: auto;
    }

    & label {
      opacity: initial;
      margin: 0 auto 0.2rem auto;
    }

    & h3 {
      font-size: 11px;
      opacity: 0.7;
      margin: 0;
    }
  }

  & .ico {
    font-size: 2rem;
    transition: all 0.5s;
    cursor: pointer;
  }

  & .ico#ExpandMoreIcon {
    margin: auto auto auto 0;

    ${({ open }) =>
      open &&
      css`
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
      `}
  }

  & .ico#AddIcon {
    margin: auto 0.4rem auto auto;
  }

  & .ico#RemoveIcon {
    margin: auto auto auto 0.4rem;
  }

  & .ico#ClearIcon {
    margin: auto 0 auto auto;
    :hover {
      color: red;
    }
  }

  & input {
    width: 10%;
    text-align: center;
    font-size: 1.5rem;
    background-color: #1f1f1f;
    border: 2px solid ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    padding: 0.2rem;
  }
`;

export const ErrorText = styled.div`
  transition: 0.5s;
  white-space: pre-wrap;
  margin: 1rem auto;
`;

export const Button = styled.button`
  width: 95%;
  height: 40px;
  margin: 0 auto 1rem auto;
  border-radius: 15px;
  border: 0px;
  font-size: 22px;
  background-color: ${({ theme }) => theme.colors.lighterBackground};
  color: ${({ theme }) => theme.colors.text};
  transition: 0.5s;
  box-shadow: 0px 8px 14px 4px #000000;

  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  :disabled {
    :hover {
      background-color: ${({ theme }) => theme.colors.lighterBackground};
    }
  }
`;

export const AnswerContainer = styled.div<{ deleteError: boolean }>`
  width: 95%;
  margin: 1.5rem auto;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 0 15px 15px 15px;
  font-size: 1rem;
  background-color: #2b282d;
  box-shadow: 0px 8px 14px 4px #000000;
  transition: all 1s;
  border: ${({ deleteError }) => (deleteError ? '2px solid #f53030' : '2px solid #2b282d')};

  p {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    align-items: center;

    .icon {
      font-size: 16px;
      height: 100%;
      margin: 0 10 0 0;
    }
  }
`;

export const AnswerBlock = styled.div`
  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-rows: minmax(65px, 25%) minmax(65px, 25%) minmax(0px, 40%) minmax(10px, 10%);
  grid-area: 1 / 1 / 4 / 3;

  .div1 {
    grid-area: 1 / 1 / 4 / 2;
    margin: 0 0 0;
    margin: 0 1rem 0 0;
    color: black;
  }

  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    align-items: center;
    text-align: center;
    padding: 0.5rem 0;

    input[type='checkbox'] {
      background-color: green;
      margin: 0 auto;
      position: relative;
      width: 100%;
      transform: scale(1.5);
      --webkit-appearance: none;
    }
  }
  .div3 {
    grid-area: 2 / 2 / 3 / 3;
    align-items: center;
    display: grid;
    grid-template-columns: 40% 60%;

    transition: 0.5s;

    &:hover {
      color: #f53030;
    }

    .div3_1 {
      display: block;
      height: 100%;
      grid-area: 1 / 1 / 2 / 2;
    }
    .div3_2 {
      grid-area: 1 / 2 / 2 / 3;
      margin-left: 0.8rem;
      text-align: left;
    }

    .div4 {
      grid-area: 4 / 1 / 5 / 3;
      background-color: red;
    }

    .ico {
      font-size: 45px;
      height: 100%;
      margin: 0 auto;
    }
  }
`;
