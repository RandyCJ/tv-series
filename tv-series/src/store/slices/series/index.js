import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllSeries } from "../../../api/nodeAPI";

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        seriesList: []
    },
    reducers: {
        setSeriesList: (state, action) => {
            state.seriesList = action.payload
        }
    }
})

export const { setSeriesList } = seriesSlice.actions

export default seriesSlice.reducer

export const fetchAllSeries = () => (dispatch) => {
    const url = getAllSeries()
    axios.get(url).then((response) => {
        dispatch(setSeriesList(response.data))
    })
    .catch((error) => console.log(error))
}