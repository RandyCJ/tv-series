import React, { useState, useEffect, createContext } from 'react'
import { useParams } from 'react-router-dom'
import { getImageURL, getTVMazeCharacters, getCharactersBySeason } from '../api/tmdb'
import './../App.css'
import Character from './Character'
import { PaginatedList } from 'react-paginated-list'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import { getImageItem } from './ImageListItem';
import { useDispatch, useSelector } from 'react-redux';
import { addSeriesCharactersAction, updateLoadedSeriesCharactersAction } from '../store/actions/characters'
import AddCharacterAPI from './FormAddCharacter/AddCharacterAPI'
import FinishSeriesAPI from './FormFinishSeries/FinishSeriesAPI'
import { updateLastSeenEpisode } from '../store/actions/series'
import { useNavigate } from "react-router-dom";


const renderNewCharacters = (cast) => {
    return (
        <ImageList cols={6} sx={{ width: 1000}}>
            {cast.map((characterInfo) => getImageItem(characterInfo))}
        </ImageList>
    )
}

const getTVMazeCharactersData = (charactersData, series_id, onClickFunction) => {
    var charactersInfo = []
    for (var i=0; i<charactersData.length; i++){
        const { person, character } = charactersData[i]
        const actor_photo = character.image? character.image.medium : 
                            person.image? person.image.medium : "/notAvailable.png"
        const item = { series_id, actor_id: person.id, name: character.name, 
                        gender: person.gender === "Female"? 1 : person.gender === "Male"? 2 : 0, 
                        actor: person.name, profile_path: person.image? person.image.medium : null, 
                        character_path: character.image? character.image.medium : null, votes: 1, 
                        api_data: 2 }
        const data = { id: character.id, image: actor_photo, name: character.name, icon: 1 }
        const newItem = { item, data, onClickFunction: onClickFunction }
        charactersInfo.push(newItem)
    }

    return charactersInfo
}

const getTMDBCharactersData = (charactersDataFull, series_id, onClickFunction) => {
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
                            profile_path: actor_photo, character_path: null,
                            votes: 1, api_data: 1 }
            const data = { id: currentCharacter.credit_id, image: actor_photo, name: currentCharacter.character, icon: 1 }
            const newItem = { item, data, onClickFunction }
            charactersInfo.push(newItem)
        }
    }

    return charactersInfo
}

export const NewCharacterContext = createContext(null)
export const UpdateSeriesContext = createContext(null)

const Serie = () => {
    
    const [showTMDBNewCharacters, setShowTMDBNewCharacters] = useState(true)
    const [newTMDBCharacters, setNewTMDBCharacters] = useState([])

    const [showTVMazeNewCharacters, setShowTVMazeNewCharacters] = useState(true)
    const [newTVMazeCharacters, setNewTVMazeCharacters] = useState([])

    const [seasonCharacters, setSeasonCharacters] = useState("0")
    const [loadedSeasonCharacters, setLoadedSeasonCharacters] = useState("0")

    const [showAddCharacterForm, setShowAddCharacterForm] = useState(false)
    const [characterToAdd, setCharacterToAdd] = useState(null)
    const [isCharacterFromScratch, setIsCharacterFromScratch] = useState(false)

    const [showFinishDateForm, setShowFinishDateForm] = useState(false)

    

    const onClickShowFinishSeriesForm = () => {
        setShowFinishDateForm(true)
    }

    const setSeason = (e) => {
        setSeasonCharacters(e.target.value)
    }

    const { charactersList: charactersJSON, loadedCharactersSeries } = useSelector(state => state.characters)
    const { seriesList: series } = useSelector(state => state.series)
    const id = parseInt(useParams().id)

    const dispatch = useDispatch()
    useEffect(() => {
        if (!loadedCharactersSeries.includes(id)){
            dispatch(addSeriesCharactersAction(id))
            dispatch(updateLoadedSeriesCharactersAction(id))
        }
    }, [dispatch, id, loadedCharactersSeries])

    const addCharacter = (character) => {
        setShowAddCharacterForm(true)
        setCharacterToAdd(character)
        setIsCharacterFromScratch(false)
    }

    const addCharacterFromScratch = () => {
        const newCharacter = { name: "", series_id: id, api_data: 0}
        setShowAddCharacterForm(true)
        setCharacterToAdd(newCharacter)
        setIsCharacterFromScratch(true)
    }

    const { name, year, start_date, finish_date, last_ep, num_last_ep, last_seen_ep, 
        poster_path, wallpaper_path, tvmaze_id, seasons, num_last_seen_ep, total_votes, finale_year } = series.find(serie => serie.id === id)
    const seriesCharacters = charactersJSON.filter(character => character.series_id === id)
    seriesCharacters.sort((a, b) => a.id - b.id);
    seriesCharacters.sort((a, b) => b.votes - a.votes);

    const [lastSeenEpisode, setLastSeenEpisode] = useState(last_seen_ep?? "")
    const [numLastSeenEpisode, setNumLastSeenEpisode] = useState(num_last_seen_ep?? "")

    const onChangeLastSeenEpisode = (e) => {
        setLastSeenEpisode(e.target.value)
    }

    const onChangeNumLastSeenEpisode = (e) => {
        setNumLastSeenEpisode(e.target.value)
    }

    const renderCharacters = (characters) => {
        return (
        <div>
            {
                characters.map((currentCharacter) => {
                    return (
                        <div key={currentCharacter.id}>
                            <Character character={currentCharacter} seriesID={id}/>
                        </div>
                    )
                })
            }
        </div>
        )
    }

    const loadNewCharacters = async (seriesID, urlFunction, getCharactersFunction, stateFunction1, stateFunction2) => {
        const url = urlFunction(seriesID, 
            seasonCharacters === "" ? "0" : 
            parseInt(seasonCharacters) > seasons ? seasons.toString() : 
            seasonCharacters)
        const { data } = await axios.get(url)
        const cast = getCharactersFunction(data, id, addCharacter)
        stateFunction1(cast)
        stateFunction2(true)
    }

    const showHideNewTVMazeCharacters = () => {
        setShowTVMazeNewCharacters(true)
        if (newTVMazeCharacters.length === 0){
            loadNewCharacters(tvmaze_id, getTVMazeCharacters, 
                getTVMazeCharactersData, setNewTVMazeCharacters, 
                setShowTVMazeNewCharacters)
        }
    }

    const showHideNewTMDBCharacters = () => {
        setShowTMDBNewCharacters(true)
        if (newTMDBCharacters.length === 0 || loadedSeasonCharacters !== seasonCharacters){
            loadNewCharacters(id, getCharactersBySeason, 
                getTMDBCharactersData, setNewTMDBCharacters, 
                setShowTMDBNewCharacters)
            setLoadedSeasonCharacters(seasonCharacters)
        }
    }

    const toggleShowTVMaze = () => {
        setShowTVMazeNewCharacters(false)
    }

    const toggleShowTMDB = () => {
        setShowTMDBNewCharacters(false)
    }

    const onClickUpdateLastSeenEpisode = () => {
        dispatch(updateLastSeenEpisode({id, last_seen_ep: lastSeenEpisode, num_last_seen_ep: numLastSeenEpisode}))
    }

    const navigate = useNavigate()
    const onClickUpdateSeries = () => {
        const currentSeries = {
            id,
            name,
            year,
            finale_year,
            start_date,
            finish_date,
            poster_path,
            wallpaper_path,
            seasons,
            tvmaze_id
        }
        navigate(`/editar_serie/${id}`, {state: {currentSeries}})
    }

    return (
            <div>
                <h1>{name} ({year}{finale_year? " - " + finale_year : ""})</h1><br/>
                {
                wallpaper_path && <img alt="wallpaper" src={getImageURL(wallpaper_path)} width={100}/>
                }
                <br/>Fecha inicio: {start_date}<br/>
                Fecha final: { finish_date?? "No terminada"}<br/>
                { finish_date? `Último capítulo emitido al ponerse al día: ${last_ep} (${num_last_ep})` : "" }<br/>
                Último capítulo visto: <input value={lastSeenEpisode} onChange={onChangeLastSeenEpisode} /> <br/>
                Número último capítulo visto: <input value={numLastSeenEpisode} onChange={onChangeNumLastSeenEpisode} type="number"/> <br/>
                <input type="button" value="Actualizar ultimos capitulos vistos" onClick={onClickUpdateLastSeenEpisode} /><br/>
                <input type="button" value="Editar serie" onClick={onClickUpdateSeries} /><br/>
                <div className='rowC'>
                    <img alt="poster" src={getImageURL(poster_path)} width={400}/>
                    <div>
                        <h3>Personajes (votos totales: {total_votes})</h3><br/>
                        <PaginatedList
                            list={seriesCharacters}
                            itemsPerPage={3}
                            renderList={renderCharacters}
                        />
                    </div>
                </div>
                <input type="button" value="Marcar como finalizado" onClick={onClickShowFinishSeriesForm} /><input type="button" value="Agregar personaje" onClick={addCharacterFromScratch}/><br />
                {
                    showFinishDateForm && <UpdateSeriesContext.Provider value={{ id, setShowFinishDateForm, setLastSeenEpisode, setNumLastSeenEpisode }}><FinishSeriesAPI /></UpdateSeriesContext.Provider>
                }

                <input type="button" value="Agregar personaje (TVMaze)" onClick={showHideNewTVMazeCharacters} />
                <input type="button" value="Ocultar personajes (TVMaze)" onClick={toggleShowTVMaze} /><br/>
                <input type="number" placeholder='Temporada' min="0" max={seasons} value={seasonCharacters} onChange={setSeason} />
                <input type="button" value="Agregar personaje (TMDB)" onClick={showHideNewTMDBCharacters} />
                <input type="button" value="Ocultar personajes (TMDB)" onClick={toggleShowTMDB} />
                {
                    showAddCharacterForm && <NewCharacterContext.Provider value={{ setShowAddCharacterForm, characterToAdd, isCharacterFromScratch }}><AddCharacterAPI /></NewCharacterContext.Provider>
                }
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