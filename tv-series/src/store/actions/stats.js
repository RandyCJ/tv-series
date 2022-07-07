import axios from "axios"
import { getLastDateURL } from "../../api/nodeAPI"
import { setLastDate } from "../slices/stats"

export const fetchLastDate = () => (dispatch) => {
    const url = getLastDateURL()
    axios.get(url).then((response) => {
        dispatch(setLastDate(response.data))
    })
    .catch((error) => console.log(error))
}

export const setLastDateAction = (lastDate) => (dispatch) => {
    const url = getLastDateURL()
    const object = { last_modification: lastDate }
    axios.put(url, object)
        .then(() => {
            dispatch(setLastDate(object))
        })
}