import { configureStore } from '@reduxjs/toolkit'
import series from './slices/series'
import characters from './slices/characters'
import stats from './slices/stats'

export default configureStore({
    reducer: {
        series,
        characters,
        stats
    }
})