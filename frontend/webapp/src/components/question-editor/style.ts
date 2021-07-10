import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 800px;
  margin: 0;
  justify-content: center;
`;

export const QuestionContainer = styled.div<{ isDragging: boolean; error: boolean }>`
  min-width: 500px;
  max-width: 800px;
  width: 95%;
  margin: 0.3rem auto;
  padding: 1rem;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? theme.colors.lighterBackground : theme.colors.background};
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  border: ${({ error }) => (error ? '2px solid #f53030' : '2px solid #1f1f1f')};
  height: auto;
  transition: all 1s ease;
  box-shadow: 0px 8px 14px 4px #000000;

  & label {
    display: block;
    font-size: 24px;
    margin: 5px auto 15px auto;
    text-align: left;
    font-weight: bold;
  }

  & .text-editor {
    margin-top: 1rem;
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
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;

      white-space: nowrap;
    }
  }

  & .ico {
    font-size: 2rem;
    transition: all 0.5s;
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
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
  margin: 1rem 0 1rem 0;
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
  background-color: ${({ theme }) => theme.colors.background};
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
  .div2 {
    align-items: center;
    text-align: center;
    padding: 0.5rem 0;

    input[type='checkbox'] {
      margin: 0 auto;
      transform: scale(1.5);
      --webkit-appearance: none;
    }
  }
  .div3 {
    align-items: center;
    transition: 0.5s;

    &:hover {
      color: #f53030;
    }

    .div3_2 {
      text-align: center;
    }

    .div4 {
      background-color: red;
    }

    .ico {
      font-size: 40px;
      margin: 0 auto;
    }
  }
`;

export const PreviewText = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 10px;
`;
