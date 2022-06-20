import conf from './conf.json'
const { api_key } = conf

export const getPossibleSeries = ( title, year ) => `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${title}&year=${year}`
export const getImageURL = (posterPath) => {
    return posterPath.charAt(0) === '/'? `https://image.tmdb.org/t/p/original${posterPath}` : posterPath
}

export const getCharactersBySeason = (tvID, season) => {
    return season === 0? `https://api.themoviedb.org/3/tv/${tvID}/aggregate_credits?api_key=${api_key}` : 
        `https://api.themoviedb.org/3/tv/${tvID}/season/${season}/aggregate_credits?api_key=${api_key}`
}

export const getSeriesInfo = (tvID) => `https://api.themoviedb.org/3/tv/${tvID}?api_key=${api_key}`

// Characters from tvmaze.com (here they also have photos for the characters)
export const getTVMazeCharacters = (tvID, _) => `http://api.tvmaze.com/shows/${tvID}/cast`

