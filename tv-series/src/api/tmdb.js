import conf from './conf.json'
const { api_key } = conf

const mainTMDBURL = "https://api.themoviedb.org/3"
const mainImageTMDBURL = "https://image.tmdb.org/t/p/original"
const mainTVMazeURL = "http://api.tvmaze.com"

export const getPossibleSeries = ( title, year ) => `${mainTMDBURL}/search/tv?api_key=${api_key}&query=${title}&year=${year}`
export const getImageURL = (posterPath) => {
    if (posterPath === "/notAvailable.png") return posterPath
    return posterPath.charAt(0) === '/' ? `${mainImageTMDBURL}${posterPath}` : posterPath
}

export const getCharactersBySeason = (seriesID, season) => {
    return season === "0"? `${mainTMDBURL}/tv/${seriesID}/aggregate_credits?api_key=${api_key}` : 
        `${mainTMDBURL}/tv/${seriesID}/season/${season}/aggregate_credits?api_key=${api_key}`
}

export const getSeriesInfo = (seriesID) => `${mainTMDBURL}/tv/${seriesID}?api_key=${api_key}`

// Characters from tvmaze.com (here they also have photos for the characters)
export const getTVMazeCharacters = (seriesID, _) => `${mainTVMazeURL}/shows/${seriesID}/cast`
export const getTVMazeShows = (query) => `${mainTVMazeURL}/search/shows?q=${query}`