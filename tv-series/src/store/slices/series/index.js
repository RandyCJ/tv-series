import { createSlice } from "@reduxjs/toolkit";
import { setSeries, addNewSeriesReducer } from "../../reducers/series";

// reducers funtions in store/reducers
// actions that use the reducers in store/actions

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        seriesList: []
    },
    reducers: {
        setSeriesList: setSeries,
        addNewSeries: addNewSeriesReducer
    }
})

export const { setSeriesList, addNewSeries } = seriesSlice.actions
export default seriesSlice.reducer
