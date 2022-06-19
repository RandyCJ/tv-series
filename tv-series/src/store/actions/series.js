import axios from "axios"
import { getAllSeries } from "../../api/nodeAPI"
import { setSeriesList } from "../slices/series"

export const fetchAllSeries = () => (dispatch) => {
    const url = getAllSeries()
    axios.get(url).then((response) => {
        dispatch(setSeriesList(response.data))
    })
    .catch((error) => console.log(error))
}