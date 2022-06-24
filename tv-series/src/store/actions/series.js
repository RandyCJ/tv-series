import axios from "axios"
import { getAllSeries } from "../../api/nodeAPI"
import { setSeriesList, addNewSeries, switchFilteredSeries } from "../slices/series"

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