import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { GlobalStyle, GlobalThemeProvider } from 'global-styles';
import { ThemeProvider, AuthProvider } from 'context';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalThemeProvider>
        <GlobalStyle />
        <AuthProvider>
          <App />
        </AuthProvider>
      </GlobalThemeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
