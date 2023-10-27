//create a slice - redux toolkit feature to define data and its actions
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        ids: [],
    },
    //reducers key handles all the functions that are used to change state
    reducers: {
        addFavorite: (state, action) => {
            state.ids.push(action.payload.id); //dispatch an action to get id
        },
        removeFavorite: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1); //find index of item to remove and remove 1
        },
    }
});

//export actions so they can be dispatched and envoked in the future
export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;