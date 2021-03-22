import { createSlice } from '@reduxjs/toolkit';

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

const theme = createSlice({
    name: 'theme',
    initialState: darkTheme,
    reducers: {
        switch: ({ name }) => name === 'dark' ? lightTheme : darkTheme
    }
});

export default theme;

export const getTheme = (state) => state.theme;