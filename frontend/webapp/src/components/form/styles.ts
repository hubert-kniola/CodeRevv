import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  flex-direction: column;
  place-items: center;
`;

export const FormContainer = styled.form`
  display: grid;

  @media (max-width: 1000px) {
    margin: 0 30px;
  }
`;

export const FormInner = styled.div`
  padding: 30px;
  width: 100%;
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
    max-width: 500px;
  }

  hr {
    margin-bottom: 30px;
    color: ${({ theme }) => theme.colors.setting};
    width: 500px;
  }
`;

export const FormGroupContainer = styled.div`
  margin-bottom: 15px;
  transition: 0.4s;

  input::placeholder {
    color: ${({ theme }) => theme.colors.text};
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

export const Input = styled.input`
  width: 100%;
  padding: 15px 15px;
  border: 0px solid transparent;
  background-color: ${({ theme }) => theme.colors.setting};

  outline: none;
  border-radius: 15px;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 15px;
  padding: 10px 15px;
  border: 0px solid transparent;
  border-radius: 15px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.setting};
  }
`;

Button.defaultProps = { type: 'submit' };

export const Error = styled.h3`
  margin-top: 5px;
  margin-left: 20px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.error};
  text-align: left;
`;
