import conf from './conf.json'
const { api_key } = conf

export const getPossibleSeries = ( title, year ) => `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${title}&year=${year}`
export const getImageURL = (posterPath) => {
    return posterPath.charAt(0) === '/'? `https://image.tmdb.org/t/p/original${posterPath}` : posterPath
}

export const getCharactersBySeason = (seriesID, season) => {
    return season === "0"? `https://api.themoviedb.org/3/tv/${seriesID}/aggregate_credits?api_key=${api_key}` : 
        `https://api.themoviedb.org/3/tv/${seriesID}/season/${season}/aggregate_credits?api_key=${api_key}`
}

export const getSeriesInfo = (seriesID) => `https://api.themoviedb.org/3/tv/${seriesID}?api_key=${api_key}`

// Characters from tvmaze.com (here they also have photos for the characters)
export const getTVMazeCharacters = (seriesID, _) => `http://api.tvmaze.com/shows/${seriesID}/cast`

