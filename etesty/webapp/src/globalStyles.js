import { createGlobalStyle } from 'styled-components';
import background from './images/bg.png';

export const GlobalStyles = createGlobalStyle`
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

export const theme = {
  colors: {
    black: '#201C21',
    grey: '#474847',
    orange: '#FE7920',
    yellow: '#FDD25E',
    white: '#EBEBEB',
  }
};
