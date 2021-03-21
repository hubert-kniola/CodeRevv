import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = [
    {
        key: nanoid(),
        title: 'Do jakiej grupy docelowej skierowana jest platforma?',
        body:
            'Do każdej! Platforma umożliwi tworzenie testów zawierających pytania otwarte i zamknięte, tym samym będzie można ją wykorzystać w każdej sytuacji.',
    },
    {
        key: nanoid(),
        title: 'Kiedy platforma zostanie ukończona?',
        body:
            'Termin oddania pracy inżynierskiej to koniec stycznia. Do tego czasu chcemy zaimplementować większość funkcjonalności.',
    },
    {
        key: nanoid(),
        title: 'Jaki będzie koszt korzystania z platformy?',
        body:
            'Na początku nie przewidujemy opłat za korzystanie z platformy. Będziemy wdzięczni za każdy feedback pozwalający nam na ulepszenia.',
    },
];

const faq = createSlice({
    name: 'faq',
    initialState: initialState,
    reducers: {
        addFaq: (state, { payload }) => [...state, { ...payload, key: nanoid() }]
    }
});

export default faq;

export const getAll = state => state.faq;
export const getOne = key => state => state.faq.filter(e => e.key === key);