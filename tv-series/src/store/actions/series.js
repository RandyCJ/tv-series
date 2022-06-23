import axios from "axios"
import { addNewSeriesURL, getAllSeries } from "../../api/nodeAPI"
import { setSeriesList, addNewSeries } from "../slices/series"

export const fetchAllSeries = () => (dispatch) => {
    const url = getAllSeries()
    axios.get(url).then((response) => {
        dispatch(setSeriesList(response.data))
    })
    .catch((error) => console.log(error))
}

export const addNewSeriesAction = (series) => (dispatch) => {
    const url = addNewSeriesURL()
    axios.post(url, series).then((response) => {
        dispatch(addNewSeries(response.data))
    })
}