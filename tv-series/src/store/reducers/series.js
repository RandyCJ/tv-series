export const setSeries = (state, action) => {
    state.seriesList = action.payload
}

export const addNewSeriesReducer = (state, action) => {
    state.seriesList.push(action.payload)
}

export const switchFilteredSeriesReducer = (state, action) => {
    state.filteredSeries = !state.filteredSeries
}

export const updateSeriesReducer = (state, action) => {
    const seriesIndex = state.seriesList.findIndex((series => series.id === action.payload.id));
    state.seriesList[seriesIndex] = { ...state.seriesList[seriesIndex], ...action.payload }
}