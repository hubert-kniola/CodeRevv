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
        error: '#eb2f2f'
    },
    background: bg_dark
};

const lightTheme = {
    name: 'light',
    colors: {
        background: '#EBEBEB',
        setting: '#FDD25E',
        primary: '#FE7920',
        secondary: '#fff',
        text: '#201C21',
        error: '#eb2f2f'
    },
    background: bg_light
};

const storageKey = 'theme';

const retrieveTheme = () => {
    let barn = new Barn(localStorage);
    const theme = barn.get(storageKey);

    return ['light', 'dark'].includes(theme) ? theme : null;
}

const saveTheme = (name) => {
    let barn = new Barn(localStorage);
    barn.set(storageKey, name);
    barn.condense();
}

const ThemeContext = createContext();
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(retrieveTheme() === 'light' ? lightTheme : darkTheme);

    return (
        <Provider value={{
            theme,
            switchTheme: () => {
                setTheme(theme.name === 'light' ? darkTheme : lightTheme);
                saveTheme(theme.name);
            }
        }}>
            {children}
        </Provider>
    )
};

export { ThemeContext, ThemeProvider };