import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import { getTheme } from 'store/slices/theme';

import background from 'images/bg.png';

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
    background-image: url(${background});
    background-position: center;
    background-position-y: -80%;
    background-size: cover;
    background-repeat: auto;
    color: #000;
    font-size: 16px;
}`;

export const GlobalThemeProvider = ({ children, ...restProps }) => {
  const theme = useSelector(getTheme);

  return <ThemeProvider {...restProps} theme={theme}>{children}</ThemeProvider>
}
