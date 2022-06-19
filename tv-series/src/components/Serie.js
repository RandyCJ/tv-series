import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getImageURL, getCharacters, getTVMazeCharacters } from '../api/tmdb'
import './../App.css'
import Character from './Character'
import { PaginatedList } from 'react-paginated-list'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import { getImageItem } from './ImageListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeriesCharacters, updateSeriesIDLoaded } from '../store/actions/characters'

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

const addCharacter = (character) => {
    console.log(character)
}

const renderNewCharacters = (cast) => {
    return (
        <ImageList cols={6} sx={{ width: 1000}}>
            {cast.map((characterInfo) => getImageItem(characterInfo))}
        </ImageList>
    )
}

const getTVMazeCharactersData = (charactersData, series_id) => {
    var charactersInfo = []
    for (var i=0; i<charactersData.length; i++){
        const { person, character } = charactersData[i]
        const actor_photo = character.image? character.image.medium : 
                            person.image? person.image.medium : "/notAvailable.png"
        const item = { series_id, actor_id: person.id, name: character.name, 
                        gender: person.gender === "Female"? 1 : person.gender === "Male"? 2 : 0, 
                        actor: person.name, profile_path: person.image? person.image.medium : null, 
                        character_path: character.image? character.image.medium : null, votes: 0, 
                        api_data: 2 }
        const data = { id: character.id, image: actor_photo, name: character.name, icon: 1 }
        const newItem = { item, data, onClickFunction: addCharacter }
        charactersInfo.push(newItem)
    }

    return charactersInfo
}

const getTMDBCharactersData = (charactersDataFull, series_id) => {
    const charactersData = charactersDataFull.cast
    var charactersInfo = []
    for (var i=0; i<charactersData.length; i++){
        const currentActor = charactersData[i]
        const { roles, profile_path } = currentActor
        const actor_photo = profile_path? getImageURL(profile_path) : "/notAvailable.png"
        for (var j=0; j<roles.length; j++){
            const currentCharacter = roles[j]
            const item = { series_id, actor_id: currentActor.id, name: currentCharacter.character, 
                            gender: currentActor.gender, actor: currentActor.name, 
                            profile_path: currentActor.profile_path, character_path: null,
                            votes: 0, api_data: 1 }
            const data = { id: currentCharacter.credit_id, image: actor_photo, name: currentCharacter.character, icon: 1 }
            const newItem = { item, data, onClickFunction: addCharacter }
            charactersInfo.push(newItem)
        }
    }
    return charactersInfo
}

const Serie = () => {

    const [showTMDBNewCharacters, setShowTMDBNewCharacters] = useState(false)
    const [newTMDBCharacters, setNewTMDBCharacters] = useState([])

    const [showTVMazeNewCharacters, setShowTVMazeNewCharacters] = useState(false)
    const [newTVMazeCharacters, setNewTVMazeCharacters] = useState([])

    const { charactersList: charactersJSON, loadedCharactersSeries } = useSelector(state => state.characters)
    const { seriesList: series } = useSelector(state => state.series)
    const id = parseInt(useParams().id)
    
    const dispatch = useDispatch()
    useEffect(() => {
        if (!loadedCharactersSeries.includes(id)){
            dispatch(fetchSeriesCharacters(id))
            dispatch(updateSeriesIDLoaded(id))
        }
    }, [dispatch, id, loadedCharactersSeries])

    const { name, year, poster_path, wallpaper_path, tvmaze_id } = series.find(serie => serie.id === id)
    const seriesCharacters = charactersJSON.filter(character => character.series_id === id)
    seriesCharacters.sort((a, b) => b.votes - a.votes);

    const loadNewCharacters = async (seriesID, urlFunction, getCharactersFunction, stateFunction1, stateFunction2) => {
        const url = urlFunction(seriesID)
        const { data } = await axios.get(url)
        const cast = getCharactersFunction(data, seriesID)
        stateFunction1(cast)
        stateFunction2(true)
    }

    const showHideNewTVMazeCharacters = () => {
        setShowTVMazeNewCharacters(!showTVMazeNewCharacters)
        if (showTVMazeNewCharacters && newTVMazeCharacters.length === 0){
            loadNewCharacters(tvmaze_id, getTVMazeCharacters, 
                getTVMazeCharactersData, setNewTVMazeCharacters, 
                setShowTVMazeNewCharacters)
        }
    }

    const showHideNewTMDBCharacters = () => {
        setShowTMDBNewCharacters(!showTMDBNewCharacters)
        if (showTMDBNewCharacters && newTMDBCharacters.length === 0){
            loadNewCharacters(id, getCharacters, 
                getTMDBCharactersData, setNewTMDBCharacters, 
                setShowTMDBNewCharacters)
        }
    }

    return (
            <div>
                <h1>{name} ({year})</h1><br/>
                {
                wallpaper_path && <img alt="wallpaper" src={getImageURL(wallpaper_path)} width={100}/>
                }
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
                <input type="button" value="Agregar personaje (TVMaze)" onClick={showHideNewTVMazeCharacters} />
                <input type="button" value="Agregar personaje (TMDB)" onClick={showHideNewTMDBCharacters} />
                {
                    showTVMazeNewCharacters && renderNewCharacters(newTVMazeCharacters)
                }
                {
                    showTMDBNewCharacters && renderNewCharacters(newTMDBCharacters)
                }
            </div>
    )
}

export default Serie;