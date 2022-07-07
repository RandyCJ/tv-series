export const setLastDateReducer = (state, action) => {
    state.lastDate = action.payload.last_modification
}