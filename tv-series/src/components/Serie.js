import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import series from "./series.json"
import charactersJSON from "./characters.json"
import { getImageURL, getCharacters } from '../api/tmdb'
import './../App.css'
import Character from './Character'
import { PaginatedList } from 'react-paginated-list'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import { getImageItem } from './ImageListItem';

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

const addCharacter = ({ currentActor, currentCharacter }) => {
    console.log(currentActor)
    console.log(currentCharacter)
}

const renderNewCharacters = (cast) => {
    return (
        <ImageList cols={6} sx={{ width: 1000}}>
                {cast.map((currentActor) => {
                    const { id, roles, gender, name, profile_path } = currentActor
                    const actor_photo = profile_path? getImageURL(profile_path) : "/notAvailable.png"
                    return (
                    roles.map((currentCharacter) => {
                        const item = { currentActor, currentCharacter }
                        const data = { id: currentCharacter.credit_id, image: actor_photo, name: currentCharacter.character, icon: 1 }
                        return (
                            getImageItem({item, data, onClickFunction: addCharacter})
                        )
                    }))
                })}
        </ImageList>
    )
}

const Serie = () => {

    const [showNewCharacters, setShowNewCharacters] = useState(false)
    const [newCharacters, setNewCharacters] = useState([])

    const { id } = useParams()
    const { name, year, poster_path, wallpaper_path } = series.find(serie => serie.id == id)
    const seriesCharacters = charactersJSON.filter(character => character.serie_id == id)
    seriesCharacters.sort((a, b) => b.votes - a.votes);

    const loadNewCharacters = async () => {
        const url = getCharacters(id)
        const { data } = await axios.get(url)
        const { cast } = data
        setNewCharacters(cast)
        setShowNewCharacters(true)
    }

    const showHideNewCharacters = () => {
        setShowNewCharacters(!showNewCharacters)
        if (showNewCharacters && newCharacters.length == 0){
            loadNewCharacters()
        }
    }


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
                <input type="button" value="Agregar personaje" onClick={showHideNewCharacters} />
                {
                    showNewCharacters && renderNewCharacters(newCharacters)
                }
            </div>
    )
}

export default Serie;