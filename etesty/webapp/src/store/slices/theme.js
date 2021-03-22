import { createSlice } from '@reduxjs/toolkit';
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
    },
    background: bg_dark
};

const lightTheme = {
    name: 'light',
    colors: {
        background: '#fff',
        setting: '#fff',
        primary: '#fff',
        secondary: '#fff',
        text: '#fff',
    },
    background: bg_light
};

const key = 'theme';

const retrieveTheme = () => {
    let barn = new Barn(localStorage);
    const theme = barn.get(key);

    return ['light', 'dark'].includes(theme) ? theme : null;
}

const saveTheme = (name) => {
    let barn = new Barn(localStorage);
    barn.set(key, name);
    barn.condense();
}

const theme = createSlice({
    name: 'theme',
    initialState: retrieveTheme() === 'light' ? lightTheme : darkTheme,
    reducers: {
        switch: ({ name }) => {
            const theme = name === 'light' ? darkTheme : lightTheme;
            saveTheme(theme.name);
            return theme;
        }
    }
});

export default theme;

export const getTheme = (state) => state.theme;