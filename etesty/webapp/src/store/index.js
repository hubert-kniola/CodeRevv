import { configureStore } from '@reduxjs/toolkit';

import faqSlice from './slices/faq';

const store = configureStore({
    reducer: {
        faq: faqSlice.reducer
    }
});

export default store;