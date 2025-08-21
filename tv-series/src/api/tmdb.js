const mainTMDBURL = "https://api.themoviedb.org/3"
const mainImageTMDBURL = "https://image.tmdb.org/t/p/w500"
const mainImageTMDBURLOriginal = "https://image.tmdb.org/t/p/original"
const mainTVMazeURL = "http://api.tvmaze.com"
const mainTheTVDBURL = "https://api4.thetvdb.com/v4"
const TMDBApiKey = process.env.REACT_APP_TMDB_API_KEY

export const getPossibleSeries = ( title, year ) => `${mainTMDBURL}/search/tv?api_key=${TMDBApiKey}&query=${title}&year=${year}`
export const getImageURL = (posterPath) => {
    if (posterPath === "/notAvailable.png") return posterPath
    return posterPath.charAt(0) === '/' ? `${mainImageTMDBURL}${posterPath}` : posterPath
}

export const getWallpaperURL = (wallpaperPath) => {
    return wallpaperPath.charAt(0) === '/' ? `${mainImageTMDBURLOriginal}${wallpaperPath}` : wallpaperPath
}

export const getCharactersBySeason = (seriesID, season) => {
    return season === "0"? `${mainTMDBURL}/tv/${seriesID}/aggregate_credits?api_key=${TMDBApiKey}` : 
        `${mainTMDBURL}/tv/${seriesID}/season/${season}/aggregate_credits?api_key=${TMDBApiKey}`
}

export const getSeriesInfo = (seriesID) => `${mainTMDBURL}/tv/${seriesID}?api_key=${TMDBApiKey}`

// Characters from tvmaze.com (here they also have photos for the characters)
export const getTVMazeCharacters = (seriesID, _) => `${mainTVMazeURL}/shows/${seriesID}/cast`
export const getTVMazeShows = (query) => `${mainTVMazeURL}/search/shows?q=${query}`

// Characters from thetvdb.com (here they also have photos for the characters)
export const getExtendedSeriesInformation = (seriesID, _) => `${mainTheTVDBURL}/series/${seriesID}/extended`

export const getSeriesImagesURL = (seriesID) => `${mainTMDBURL}/tv/${seriesID}/images?api_key=${TMDBApiKey}`

const loginURL = `${mainTheTVDBURL}/login`

export async function getTVDBToken() {
    const stored = localStorage.getItem("tvdbToken");
    if (stored) {
        const { token, createdAt } = JSON.parse(stored);
        const tokenAge = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);

        if (tokenAge < 29) {
            console.log(`Usando token, le quedan ${29 - tokenAge} dias`);
            return token;
        }
    }

    console.log(`Generando nuevo token`);
    const res = await fetch(loginURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            apikey: process.env.REACT_APP_TVDB_API_KEY,
            pin: process.env.REACT_APP_TVDB_PIN
        })
    });

    const data = await res.json();
    const newToken = data.data.token;

    localStorage.setItem("tvdbToken", JSON.stringify({
        token: newToken,
        createdAt: Date.now()
    }));

    return newToken;
}