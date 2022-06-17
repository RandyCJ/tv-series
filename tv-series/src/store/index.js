import { configureStore } from '@reduxjs/toolkit'
import series from './slices/series'

export default configureStore({
    reducer: {
        series
    }
})