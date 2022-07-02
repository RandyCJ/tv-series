const mainURL = "http://localhost:8080"

export const getAllSeries = () => `${mainURL}/api/series`
export const getCharactersFromSeries = (seriesID) => `${mainURL}/api/series/${seriesID}/characters`
export const addNewCharacter = (seriesID) => `${mainURL}/api/series/${seriesID}/add_character`
export const addVotesCharacterURL = (characterID) => `${mainURL}/api/characters/${characterID}/add_votes`
export const substractVotesCharacterURL = (characterID) => `${mainURL}/api/characters/${characterID}/substract_votes`
export const deleteCharacterURL = (characterID) => `${mainURL}/api/characters/${characterID}/delete`
export const addNewSeriesURL = () => `${mainURL}/api/series`
export const updateSeriesURL = (seriesID) => `${mainURL}/api/series/${seriesID}`