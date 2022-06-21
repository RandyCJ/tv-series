import { createSlice } from "@reduxjs/toolkit";
import { addCharacters, updateSeriesCharacters, addNewCharacter } from "../../reducers/characters";

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
        updateLoadedSeriesCharacters: updateSeriesCharacters,
        addNewCharacterToList: addNewCharacter
    }
})

export const { addSeriesCharacters, updateLoadedSeriesCharacters, addNewCharacterToList } = charactersSlice.actions
export default charactersSlice.reducer
