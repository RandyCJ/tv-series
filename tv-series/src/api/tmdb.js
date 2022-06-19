import conf from './conf.json'
const { api_key } = conf

export const getPossibleSeries = ( title, year ) => `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${title}&year=${year}`
export const getImageURL = (posterPath) => {
    if (posterPath.charAt(0) === '/'){
        return `https://image.tmdb.org/t/p/original${posterPath}`
    }
    return posterPath
}
export const getCharacters = (tvID) => `https://api.themoviedb.org/3/tv/${tvID}/aggregate_credits?api_key=${api_key}`

// Characters from tvmaze.com (here they also have photos for the characters)
export const getTVMazeCharacters = (tvID) => `http://api.tvmaze.com/shows/${tvID}/cast`