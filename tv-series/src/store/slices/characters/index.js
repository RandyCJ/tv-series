import { createSlice } from "@reduxjs/toolkit";
import { addSeriesCharactersReducer, updateLoadedSeriesCharactersReducer, 
         addNewCharacterReducer, addVotesCharacterReducer, 
         substractVotesCharacterReducer,
         deleteCharacterReducer } from "../../reducers/characters";

// reducers funtions in store/reducers
// actions that use the reducers in store/actions

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        charactersList: [],
        loadedCharactersSeries: []
    },
    reducers: {
        addSeriesCharacters: addSeriesCharactersReducer,
        updateLoadedSeriesCharacters: updateLoadedSeriesCharactersReducer,
        addNewCharacter: addNewCharacterReducer,
        addVotesCharacter: addVotesCharacterReducer,
        substractVotesCharacter: substractVotesCharacterReducer,
        deleteCharacter: deleteCharacterReducer
    }
})

export const { addSeriesCharacters, updateLoadedSeriesCharacters, addNewCharacter, 
               addVotesCharacter, substractVotesCharacter, deleteCharacter } = charactersSlice.actions
export default charactersSlice.reducer
