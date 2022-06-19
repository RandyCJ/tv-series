import { configureStore } from '@reduxjs/toolkit'
import series from './slices/series'
import characters from './slices/characters'

export default configureStore({
    reducer: {
        series,
        characters
    }
})