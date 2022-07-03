import { createSlice } from "@reduxjs/toolkit";
import { setSeries, addNewSeriesReducer, switchFilteredSeriesReducer, updateSeriesReducer, updateTotalCharacterVotesReducer } from "../../reducers/series";

// reducers funtions in store/reducers
// actions that use the reducers in store/actions

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        seriesList: [],
        filteredSeries: false
    },
    reducers: {
        setSeriesList: setSeries,
        addNewSeries: addNewSeriesReducer,
        switchFilteredSeries: switchFilteredSeriesReducer,
        updateSeries: updateSeriesReducer,
        updateTotalCharacterVotes: updateTotalCharacterVotesReducer
    }
})

export const { setSeriesList, addNewSeries, switchFilteredSeries, updateSeries, updateTotalCharacterVotes } = seriesSlice.actions
export default seriesSlice.reducer
