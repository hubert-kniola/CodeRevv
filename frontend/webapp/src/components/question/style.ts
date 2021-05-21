import styled from 'styled-components';

export const QuestionContainer = styled.div<{ error: boolean }>`
  min-width: 500px;
  width: 95%;
  margin: 2rem auto;
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
    color: black;
    text-align: left;
    background-color: ${({ theme }) => theme.colors.text};
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
  background-color: ${({ theme }) => theme.colors.lighterBackgound};
  color: ${({ theme }) => theme.colors.text};
  transition: 0.5s;
  box-shadow: 0px 8px 14px 4px #000000;

  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  :disabled {
    :hover {
      background-color: ${({ theme }) => theme.colors.lighterBackgound};
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
