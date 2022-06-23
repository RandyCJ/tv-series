export const setSeries = (state, action) => {
    state.seriesList = action.payload
}

export const addNewSeriesReducer = (state, action) => {
    state.seriesList.push(action.payload)
}