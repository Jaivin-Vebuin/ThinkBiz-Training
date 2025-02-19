import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../features/slices/languageSlice';

const store = configureStore({
    reducer: {
        lang: languageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
