export const getAllSeries = () => "http://localhost:8080/api/series"
export const getCharactersFromSeries = (seriesID) => `http://localhost:8080/api/series/${seriesID}/characters`
export const addNewCharacter = (tvID) => `http://localhost:8080/api/series/${tvID}/add_character`
