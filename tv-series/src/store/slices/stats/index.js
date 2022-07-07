import { createSlice } from "@reduxjs/toolkit";
import { setLastDateReducer } from "../../reducers/stats";

// reducers funtions in store/reducers
// actions that use the reducers in store/actions

export const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        lastDate: ""
    },
    reducers: {
        setLastDate: setLastDateReducer
    }
})

export const { setLastDate } = statsSlice.actions
export default statsSlice.reducer
