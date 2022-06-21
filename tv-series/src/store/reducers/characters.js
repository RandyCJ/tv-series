export const addCharacters = (state, action) => {
    const newState = state.charactersList.concat(action.payload)
    state.charactersList = newState
}

export const updateSeriesCharacters = (state, action) => {
    state.loadedCharactersSeries.push(action.payload)
}

export const addNewCharacter = (state, action) => {
    state.charactersList.push(action.payload)
}