import conf from './conf.json'
const { api_key } = conf

export const getPossibleSeries = ( title, year ) => `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${title}&year=${year}`
export const getImageURL = (posterPath) => `https://image.tmdb.org/t/p/original${posterPath}`
export const getCharacters = (tvID) => `https://api.themoviedb.org/3/tv/${tvID}/credits?api_key=${api_key}`