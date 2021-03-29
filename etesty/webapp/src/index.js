import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { GlobalStyle, GlobalThemeProvider } from 'global-styles';
import { ThemeProvider } from 'context';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
        <GlobalThemeProvider>
          <GlobalStyle />
          <App />
        </GlobalThemeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
