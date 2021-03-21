import { configureStore } from '@reduxjs/toolkit';

import faqSlice from './slices/faq';
import themeSlice from './slices/theme'

const store = configureStore({
    reducer: {
        faq: faqSlice.reducer,
        theme: themeSlice.reducer
    }
});

export default store;