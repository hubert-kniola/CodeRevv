import { useContext, FunctionComponent } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { ThemeContext } from 'context';

export const GlobalThemeProvider: FunctionComponent = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  & button {
    outline: none;
  }

  & input {
    caret-color: ${({ theme }) => theme.colors.text}
  }

  html, body {
    margin: 0 0;
    font-family: Roboto, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: url(${({ theme }) => theme.background});
    
    transition: all 0.2s ease-in-out;
    background-repeat: repeat;
    font-size: 16px;
  }

  body::-webkit-scrollbar {
    width: 0.3rem;
  }

  body::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.lighterBackground}
  }

  body::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary}
  }
`;
