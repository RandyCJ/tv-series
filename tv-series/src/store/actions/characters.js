import axios from "axios"
import { getCharactersFromSeries } from "../../api/nodeAPI"
import { addSeriesCharacters, updateLoadedSeriesCharacters } from "../slices/characters"

export const fetchSeriesCharacters = (seriesID) => (dispatch) => {
    const url = getCharactersFromSeries(seriesID)
    axios.get(url).then((response) => {
        dispatch(addSeriesCharacters(response.data))
    })
    .catch((error) => console.log(error))
}

export const updateSeriesIDLoaded = (seriesID) => (dispatch) => {
    dispatch(updateLoadedSeriesCharacters(seriesID))
}