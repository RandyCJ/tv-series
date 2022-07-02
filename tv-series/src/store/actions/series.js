import axios from "axios"
import { getAllSeries, updateSeriesURL } from "../../api/nodeAPI"
import { setSeriesList, addNewSeries, switchFilteredSeries, updateSeries } from "../slices/series"

export const fetchAllSeries = () => (dispatch) => {
    const url = getAllSeries()
    axios.get(url).then((response) => {
        dispatch(setSeriesList(response.data))
    })
    .catch((error) => console.log(error))
}

export const addNewSeriesAction = (series) => (dispatch) => {
    dispatch(addNewSeries(series))
}

export const switchFilteredSeriesAction = () => (dispatch) => {
    dispatch(switchFilteredSeries())
}

export const updateSeriesAction = (series) => (dispatch) => {
    dispatch(updateSeries(series))
}

export const updateLastSeenEpisode = (series) => dispatch => {
    const url = updateSeriesURL(series.id)
    axios.put(url, series).then(() => {
        dispatch(updateSeries(series))
    })
    .catch((error) => console.log(error))
}