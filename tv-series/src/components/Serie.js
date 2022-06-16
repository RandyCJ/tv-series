import React from 'react'
import { useParams } from 'react-router-dom'
import series from "./series.json"
import charactersJSON from "./characters.json"
import { getImageURL } from './api/tmdb'
import './../App.css'
import Character from './Character'
import { PaginatedList } from 'react-paginated-list'

const renderCharacters = (characters) => {
    return (
    <div>
        {
            characters.map((currentCharacter) => {
                return (
                    <div key={currentCharacter.id}>
                        <Character character={currentCharacter} />
                    </div>
                )
            })
        }
    </div>
    )
}

const Serie = () => {

    const { id } = useParams()
    const { name, year, poster_path, wallpaper_path } = series.find(serie => serie.id == id)
    const seriesCharacters = charactersJSON.filter(character => character.serie_id == id)
    seriesCharacters.sort((a, b) => b.votes - a.votes);
    return (
            <div>
                <h1>{name} ({year})</h1><br/>
                {/* {
                wallpaper_path && <img alt="wallpaper" src={getImageURL(wallpaper_path)} width={1000}/>
                } */}
                <div className='rowC'>
                    <img alt="poster" src={getImageURL(poster_path)} width={400}/>
                    <div>
                        <h3>Personajes</h3><br/>
                        <PaginatedList
                            list={seriesCharacters}
                            itemsPerPage={3}
                            renderList={renderCharacters}
                        />
                    </div>
                </div>
            </div>
    )
}

export default Serie;