import { createContext, useState } from 'react';
import Barn from 'barn';

import bg_dark from 'images/bg.png';
import bg_light from 'images/bg_light.png';

const darkTheme = {
  name: 'dark',
  colors: {
    background: '#201C21',
    setting: '#474847CC',
    primary: '#FE7920',
    secondary: '#FDD25E',
    text: '#EBEBEB',
    error: '#eb2f2f',
  },
  background: bg_dark,
};

const lightTheme = {
  name: 'light',
  colors: {
    background: '#EBEBEB',
    setting: '#FDD25E',
    primary: '#FE7920',
    secondary: '#fff',
    text: '#201C21',
    error: '#eb2f2f',
  },
  background: bg_light,
};

const storageKey = 'theme';

const retrieveTheme = () => {
  const barn = new Barn(localStorage);
  return barn.get(storageKey) === 'light' ? lightTheme : darkTheme;
};

const saveTheme = ({ name }) => {
  const barn = new Barn(localStorage);
  barn.set(storageKey, name);
  barn.condense();
};

const ThemeContext = createContext();
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(retrieveTheme());

  return (
    <Provider
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
    </Provider>
  );
};

export { ThemeContext, ThemeProvider };
