import { createSlice } from "@reduxjs/toolkit";
import { setSeries } from "../../reducers/series";

// reducers funtions in store/reducers
// actions that use the reducers in store/actions

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        seriesList: []
    },
    reducers: {
        setSeriesList: setSeries
    }
})

export const { setSeriesList } = seriesSlice.actions
export default seriesSlice.reducer
