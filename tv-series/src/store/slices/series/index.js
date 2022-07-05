import { createSlice } from "@reduxjs/toolkit";
import { setSeries, addNewSeriesReducer, switchFilteredSeriesReducer, 
    updateSeriesReducer, updateTotalCharacterVotesReducer, switchUnfinishedSeriesReducer } from "../../reducers/series";

// reducers funtions in store/reducers
// actions that use the reducers in store/actions

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        seriesList: [],
        filteredSeries: false,
        unfinishedSeries: false
    },
    reducers: {
        setSeriesList: setSeries,
        addNewSeries: addNewSeriesReducer,
        switchFilteredSeries: switchFilteredSeriesReducer,
        updateSeries: updateSeriesReducer,
        updateTotalCharacterVotes: updateTotalCharacterVotesReducer,
        switchUnfinishedSeries: switchUnfinishedSeriesReducer
    }
})

export const { setSeriesList, addNewSeries, switchFilteredSeries, updateSeries, updateTotalCharacterVotes, switchUnfinishedSeries } = seriesSlice.actions
export default seriesSlice.reducer
