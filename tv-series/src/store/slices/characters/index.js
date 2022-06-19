import { createSlice } from "@reduxjs/toolkit";
import { addCharacters, updateSeriesCharacters } from "../../reducers/characters";

// reducers funtions in store/reducers
// actions that use the reducers in store/actions

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        charactersList: [],
        loadedCharactersSeries: []
    },
    reducers: {
        addSeriesCharacters: addCharacters,
        updateLoadedSeriesCharacters: updateSeriesCharacters
    }
})

export const { addSeriesCharacters, updateLoadedSeriesCharacters } = charactersSlice.actions
export default charactersSlice.reducer
