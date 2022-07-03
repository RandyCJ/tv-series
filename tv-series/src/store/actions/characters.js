import axios from "axios"
import { addVotesCharacterURL, substractVotesCharacterURL, 
         deleteCharacterURL, getCharactersFromSeries } from "../../api/nodeAPI"
import { addSeriesCharacters, updateLoadedSeriesCharacters, 
         addNewCharacter, addVotesCharacter, 
         substractVotesCharacter, deleteCharacter } from "../slices/characters"
import { updateTotalCharacterVotes } from "../slices/series"

export const addSeriesCharactersAction = (seriesID) => (dispatch) => {
    const url = getCharactersFromSeries(seriesID)
    axios.get(url).then((response) => {
        dispatch(addSeriesCharacters(response.data))
    })
    .catch((error) => console.log(error))
}

export const updateLoadedSeriesCharactersAction = (seriesID) => (dispatch) => {
    dispatch(updateLoadedSeriesCharacters(seriesID))
}

export const addNewCharacterAction = (character) => dispatch => {
    dispatch(addNewCharacter(character))
}

export const addVotesToCharacterAction = (characterID, votes, seriesID) => dispatch => {
    const url = addVotesCharacterURL(characterID)
    axios.put(url, { votes }).then(() => {
        dispatch(addVotesCharacter({ id: characterID, votes }))
        dispatch(updateTotalCharacterVotes({ seriesID, votes, type: 0 }))
    })
}

export const substractVotesToCharacterAction = (characterID, votes, seriesID) => dispatch => {
    const url = substractVotesCharacterURL(characterID)
    axios.put(url, { votes }).then(() => {
        dispatch(substractVotesCharacter({ id: characterID, votes }))
        dispatch(updateTotalCharacterVotes({ seriesID, votes, type: 1 }))
    })
}

export const deleteCharacterAction = (characterID, votes, seriesID) => dispatch => {
    const url = deleteCharacterURL(characterID)
    axios.delete(url).then(() => {
        dispatch(deleteCharacter(characterID))
        dispatch(updateTotalCharacterVotes({ seriesID, votes, type: 1 }))
    })
}