import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from './favorites';

export const store = configureStore({
    //different slices of state data
    //and actions that can change the data
    //that are used by redux to store
    reducer: {
        favoriteMeals: favoritesReducer,
    }
});