import { createSlice } from '@reduxjs/toolkit';

const darkTheme = {
    colors: {
        black: '#201C21',
        grey: '#474847',
        orange: '#FE7920',
        yellow: '#FDD25E',
        white: '#EBEBEB',
    }
};

const lightTheme = {
    colors: {
        black: '#fff',
        grey: '#fff',
        orange: '#fff',
        yellow: '#fff',
        white: '#fff',
    }
};

const theme = createSlice({
    name: 'theme',
    initialState: darkTheme,
    reducers: {
        switch: (state) => state === darkTheme ? lightTheme : darkTheme
    }
});

export default theme;

export const getTheme = (state) => state.theme;