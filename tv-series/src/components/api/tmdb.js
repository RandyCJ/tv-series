import conf from './conf.json'
const { api_key } = conf

export const getPossibleSeries = ( title, year ) => `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${title}&year=${year}`
export const getPosterURL = (posterPath) => `https://image.tmdb.org/t/p/original${posterPath}`