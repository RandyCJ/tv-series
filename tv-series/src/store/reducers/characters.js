export const addSeriesCharactersReducer = (state, action) => {
    // Adds all database characters of a series
    const newState = state.charactersList.concat(action.payload)
    state.charactersList = newState
}

export const updateLoadedSeriesCharactersReducer = (state, action) => {
    // Adds the id of the character's series loaded
    state.loadedCharactersSeries.push(action.payload)
}

export const addNewCharacterReducer = (state, action) => {
    // Add new character
    state.charactersList.push(action.payload)
}

export const addVotesCharacterReducer = (state, action) => {
    // Update the votes of a character
    const characterIndex = state.charactersList.findIndex((character => character.id === action.payload.id));
    state.charactersList[characterIndex].votes += action.payload.votes
}

export const substractVotesCharacterReducer = (state, action) => {
    // Update the votes of a character
    const characterIndex = state.charactersList.findIndex((character => character.id === action.payload.id));
    state.charactersList[characterIndex].votes -= action.payload.votes
}

export const deleteCharacterReducer = (state, action) => {
    const characterIndex = state.charactersList.findIndex((character => character.id === action.payload));
    state.charactersList.splice(characterIndex, 1)
}