import { createContext, useState, FunctionComponent } from 'react';
import { DefaultTheme } from 'styled-components';

import bg_dark from 'images/bg.png';
import bg_light from 'images/bg_light.png';

const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    background: '#201c21',
    alphabg: 'hsla(288, 8.196721311475414%, 11.96078431372549%, 0.801)',
    setting: '#474847CC',
    primary: '#FE7920',
    secondary: '#FDD25E',
    text: '#EBEBEB',
    error: '#eb2f2f',
  },
  background: bg_dark,
};

const lightTheme: DefaultTheme = {
  name: 'light',
  colors: {
    background: '#EBEBEB',
    alphabg: 'rgba(235, 235, 235, 0.534)',
    setting: '#FDD25E',
    primary: '#FE7920',
    secondary: '#fff',
    text: '#201C21',
    error: '#eb2f2f',
  },
  background: bg_light,
};

const storageKey = 'theme';

const retrieveTheme = (): DefaultTheme => {
  const name = localStorage.getItem(storageKey);

  return name != null && name === 'light' ? lightTheme : darkTheme;
};

const saveTheme = ({ name }: DefaultTheme): void => {
  localStorage.setItem(storageKey, name);
};

interface IThemeContext {
  theme: DefaultTheme;
  switchTheme: () => void;
}

export const ThemeContext = createContext({} as IThemeContext);

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState(retrieveTheme());

  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchTheme: () => {
          const newTheme = theme.name === 'light' ? darkTheme : lightTheme;
          setTheme(newTheme);
          saveTheme(newTheme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
