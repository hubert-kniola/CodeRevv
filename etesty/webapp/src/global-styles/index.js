import { useContext } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { ThemeContext } from 'context';

export const GlobalThemeProvider = ({ children, ...restProps }) => {
  const themeContext = useContext(ThemeContext);

  return <ThemeProvider {...restProps} theme={themeContext.theme}>{children}</ThemeProvider>
}

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body {
    margin: 0 0;
    height: 100%;
    font-family: Roboto, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: url(${({ theme }) => theme.background});
    
    transition: all 0.2s ease-in-out;
    background-position: center;
    background-position-y: -80%;
    background-size: cover;
    background-repeat: auto;
    font-size: 16px;
}`;
