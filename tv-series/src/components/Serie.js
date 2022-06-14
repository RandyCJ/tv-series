import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import series from "./series.json"
import charactersJSON from "./characters.json"
import { getImageURL } from './api/tmdb'

const Serie = () => {

    
    const { id } = useParams()
    const { name, year, poster_path, wallpaper_path } = series.find(serie => serie.id == id)
    const seriesCharacters = charactersJSON.filter(character => character.serie_id == id)
    seriesCharacters.sort((a, b) => b.votes - a.votes);
    
    const [title, setTitle] = useState(name)
    const [seriesYear, setSeriesYear] = useState(year)
    const [posterURL, setPosterURL] = useState(poster_path)
    const [bannerURL, setBannerURL] = useState(wallpaper_path)
    const [characters, setCharacters] = useState(seriesCharacters)

    // setTitle(name)
    // setSeriesYear(year)
    // setPosterURL(poster_path)
    // setBannerURL(wallpaper_path)
    // setCharacters(seriesCharacters)

    return (
            <div>
                <h1>{title} ({seriesYear})</h1><br/>
                {
                bannerURL && <img alt="wallpaper" src={getImageURL(bannerURL)} width={1000}/>
                }
                <br/>
                <img alt="poster" src={getImageURL(posterURL)} width={400}/>
                <br/><br/><br/>
                <h3>Personajes</h3><br/>
                <ul>
                    {
                        characters.map((character) => {
                            const { id, name, votes } = character
                            return (
                                <li key={id}>
                                    <h4>{name}</h4><br/>
                                    <p>Votos: {votes}</p>
                                    <br/>
                                </li>
                            )
                        })
                    }
                </ul>


            </div>
    )
    
}

export default Serie;