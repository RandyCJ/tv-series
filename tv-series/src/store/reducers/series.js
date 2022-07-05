export const setSeries = (state, action) => {
    state.seriesList = action.payload
}

export const addNewSeriesReducer = (state, action) => {
    state.seriesList.unshift({ ...action.payload, total_votes: 0 })
}

export const switchFilteredSeriesReducer = (state, action) => {
    state.filteredSeries = !state.filteredSeries
    state.unfinishedSeries = false
}

export const switchUnfinishedSeriesReducer = (state, action) => {
    state.unfinishedSeries = !state.unfinishedSeries
    state.filteredSeries = false
}

export const updateSeriesReducer = (state, action) => {
    const seriesIndex = state.seriesList.findIndex((series => series.id === action.payload.id));
    state.seriesList[seriesIndex] = { ...state.seriesList[seriesIndex], ...action.payload }
}

export const updateTotalCharacterVotesReducer = (state, action) => {
    const seriesIndex = state.seriesList.findIndex((series => series.id === action.payload.seriesID));
    if (action.payload.type === 0){
        state.seriesList[seriesIndex] = { ...state.seriesList[seriesIndex], 
            total_votes: state.seriesList[seriesIndex].total_votes + action.payload.votes}
    } else {
        state.seriesList[seriesIndex] = { ...state.seriesList[seriesIndex], 
            total_votes: state.seriesList[seriesIndex].total_votes - action.payload.votes}
    }
}