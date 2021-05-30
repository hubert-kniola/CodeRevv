import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: min(80vw, 1000px);
  background: ${({ theme }) => theme.colors.background};
  border-radius: 30px;
  height: max-content;
  padding: 30px 30px 30px 30px;
  justify-content: center;
  transition: 0.2s all ease;
  margin: 1rem auto;

  hr {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 50%;
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

export const HeaderContainer = styled.div`
  text-align: center;
`;

export const BigText = styled.div`
  font-size: 24px;
  font-weight: normal;
  line-height: normal;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const SmallText = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  margin: 10px 10px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 600px) {
    font-size: 10px;
    line-height: 22px;
  }
`;

export const ChooserContainer = styled.div<{ active: boolean; filled: boolean }>`
  width: 100%;
  padding: 10px 10px 10px 10px;
  border-radius: 15px;
  justify-content: center;
  transition: 0.2s all ease;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text};
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.colors.primary}` : `2px solid ${theme.colors.setting}`};

  &:hover {
    transition: 0.2s ease-in-out;
    background: ${({ theme }) => theme.colors.setting};
  }

  ${({ filled }) =>
    filled &&
    css`
      -webkit-box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.secondary};
      -moz-box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.secondary};
      box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.secondary};
    `}
`;

export const ChooserText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
`;

export const MainButton = styled.button<{ disabled: boolean }>`
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

  ${({ disabled }) =>
    disabled
      ? css`
          background: ${({ theme }) => theme.colors.lighterBackground};
          color: ${({ theme }) => theme.colors.setting};
          cursor: default;
        `
      : css`
          &:hover {
            transition: 0.2s ease-in-out;
            background: ${({ theme }) => theme.colors.text};
            color: ${({ theme }) => theme.colors.setting};
          }
        `}
`;

export const MinorButton = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.setting};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 15px;
  margin: 1rem auto;
  padding: 10px 10px;
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

export const FillContainer = styled.div`
  min-height: 500px;
`;

export const AnswerContainer = styled.div`
  margin-top: 20px;
  padding: 10px 10px;
  height: 100%;
  transition: all 0.5s ease;
`;
