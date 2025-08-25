import { useState, useEffect, createContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getImageURL, getWallpaperURL, getExtendedSeriesInformation, getCharactersBySeason, getTVDBToken } from '../api/tmdb'
import './../App.css'
import Character from './Character'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import { getImageItem, getNewCharacterCard } from './ImageListItem';
import { useDispatch, useSelector } from 'react-redux';
import { addSeriesCharactersAction, updateLoadedSeriesCharactersAction } from '../store/actions/characters'
import AddCharacterAPI from './FormAddCharacter/AddCharacterAPI'
import FinishSeriesAPI from './FormFinishSeries/FinishSeriesAPI'
import { updateLastSeenEpisode } from '../store/actions/series'
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import CharacterCarousel from './CharacterCarousel'

const renderNewCharacters = (cast) => {
    return (
        <ImageList cols={6} sx={{ width: 1000}}>
            {cast.map((characterInfo) => getNewCharacterCard(characterInfo))}
        </ImageList>
    )
}

const getTheTVDBCharactersData = (charactersDataFull, series_id, onClickFunction) => {
    const charactersData = charactersDataFull.data.characters
    var charactersInfo = []
    for (var i=0; i<charactersData.length; i++){
        const { id, name, peopleId, image, personImgURL, personName } = charactersData[i]
        const actor_photo = image? image : 
                            personImgURL? personImgURL : "/notAvailable.png"
        const item = { series_id, actor_id: peopleId, name, 
                        gender: 0, 
                        actor: personName, profile_path: personImgURL? personImgURL : null, 
                        character_path: image? image : null, votes: 1, 
                        api_data: 2 }
        const data = { id, image: actor_photo, name, icon: 1 }
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

    const [showTheTVDBNewCharacters, setShowTheTVDBNewCharacters] = useState(true)
    const [newTheTVDBCharacters, setNewTheTVDBCharacters] = useState([])

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
        poster_path, wallpaper_path, thetvdb_id, seasons, num_last_seen_ep, total_votes, finale_year } = series.find(serie => serie.id === id)
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
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    overflow: "hidden",
                    justifyContent: "left",
                }}
            >
              {
                characters.map((currentCharacter) => (
                    <Character character={currentCharacter} seriesID={id} key={currentCharacter.id}/>
                ))
              }
            </Box>
        )
    }

    const loadNewCharacters2 = async (seriesID, urlFunction, getCharactersFunction, stateFunction1, stateFunction2) => {
        const url = urlFunction(seriesID, 
            seasonCharacters === "" ? "0" : 
            parseInt(seasonCharacters) > seasons ? seasons.toString() : 
            seasonCharacters)
        const { data } = await axios.get(url)
        const cast = getCharactersFunction(data, id, addCharacter)
        stateFunction1(cast)
        stateFunction2(true)
    }

    const loadNewCharacters = async (seriesID, urlFunction, getCharactersFunction, stateFunction1, stateFunction2) => {
        const url = urlFunction(seriesID)
        const bearerToken = await getTVDBToken()
        const config = {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        }
        const { data } = await axios.get(url, config)
        const cast = getCharactersFunction(data, id, addCharacter)
        stateFunction1(cast)
        stateFunction2(true)
    }


    const showHideNewTheTVDBCharacters = () => {
        setShowTheTVDBNewCharacters(true)
        if (newTheTVDBCharacters.length === 0){
            loadNewCharacters(thetvdb_id, getExtendedSeriesInformation, 
                getTheTVDBCharactersData, setNewTheTVDBCharacters, 
                setShowTheTVDBNewCharacters)
        }
    }

    const showHideNewTMDBCharacters = () => {
        setShowTMDBNewCharacters(true)
        if (newTMDBCharacters.length === 0 || loadedSeasonCharacters !== seasonCharacters){
            loadNewCharacters2(id, getCharactersBySeason, 
                getTMDBCharactersData, setNewTMDBCharacters, 
                setShowTMDBNewCharacters)
            setLoadedSeasonCharacters(seasonCharacters)
        }
    }

    const toggleShowTheTVDB = () => {
        setShowTheTVDBNewCharacters(false)
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
            thetvdb_id
        }
        navigate(`/editar_serie/${id}`, {state: {currentSeries}})
    }

    // Lógica para ajustar cantidad de personajes de acuerdo a ancho de la pantalla
    const containerRef = useRef(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            const cardWidth = 160;
            const newItems = Math.floor(width / cardWidth);

            setItemsPerPage(newItems > 0 ? newItems : 1);
        }
        });

        observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
            <div>
                <Box>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "16/9",
                            borderRadius: "12px",
                            mb: 4,
                            overflow: "hidden",
                        }}
                    >
                        <Box // Contiene wallpaper
                            component="img"
                            src={getWallpaperURL(wallpaper_path)}
                            alt="wallpaper"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />

                        <Box // Oscurece wallpaper
                            sx={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(0,0,0,0.45)",
                            }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                px: 4,
                                color: "white",
                            }}
                        >
        
                            <Box // Poster + Info
                                sx={{
                                    flex: "0 0 40%", 
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    gap: 4,
                                    mt: "2%",
                                }}
                            >
                                <Box // Poster
                                    component="img"
                                    src={getImageURL(poster_path)}
                                    alt="poster"
                                    sx={{
                                        width: "100%",
                                        maxWidth: 220,
                                        borderRadius: "12px",
                                        boxShadow: "0 6px 20px rgba(0,0,0,0.7)",
                                    }}
                                />

                                <Box //Titulo de la serie, fechas e inputs
                                >
                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{
                                            textShadow: `
                                            -2px -2px 0 #000,  
                                            2px -2px 0 #000,
                                            -2px 2px 0 #000,
                                            2px 2px 0 #000
                                            `,
                                        }}
                                    >
                                        {name} ({year}{finale_year ? " - " + finale_year : ""})
                                    </Typography>

                                    <Typography variant="body1" sx={{ textShadow: "1px 1px 3px black" }}>
                                        Fecha inicio: {start_date}
                                    </Typography>

                                    <Typography variant="body1" sx={{ textShadow: "1px 1px 3px black" }}>
                                        Fecha final: {finish_date ?? "No terminada"}
                                    </Typography>

                                    {finish_date && (
                                    <Typography
                                        variant="body1"
                                        sx={{ textShadow: "1px 1px 3px black" }}
                                    >
                                        Último capítulo emitido: {last_ep} ({num_last_ep})
                                    </Typography>
                                    )}

                                    <Box mt={2}>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            sx={{ textShadow: "1px 1px 2px black" }}
                                        >
                                            Último capítulo visto:
                                        </Typography>
                                        <input
                                            value={lastSeenEpisode}
                                            onChange={onChangeLastSeenEpisode}
                                        />
                                        <br />
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            sx={{ textShadow: "1px 1px 2px black" }}
                                        >
                                            Número último capítulo visto:
                                        </Typography>
                                        <input
                                            type="number"
                                            value={numLastSeenEpisode}
                                            onChange={onChangeNumLastSeenEpisode}
                                        />
                                        <br />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={onClickUpdateLastSeenEpisode}
                                            sx={{ mt: 2, mr: 1 }}
                                        >
                                            Actualizar capítulos
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            onClick={onClickUpdateSeries}
                                            sx={{ mt: 2 }}
                                        >
                                            Editar serie
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>

                            <Box // Personajes
                                ref={containerRef}
                                sx={{
                                    flex: "0 0 40%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "left",
                                    mt: 2,
                                }}
                            >
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 1,
                                    textShadow: "2px 2px 4px black",
                                }}
                            >
                                Personajes (votos totales: {total_votes})
                            </Typography>

                            <CharacterCarousel seriesCharacters={seriesCharacters} itemsPerPage={itemsPerPage} seriesId={id} />

                            </Box>
                        </Box>
                    </Box>
                </Box>

                <input type="button" value="Marcar como finalizado" onClick={onClickShowFinishSeriesForm} /><input type="button" value="Agregar personaje" onClick={addCharacterFromScratch}/><br />
                {
                    showFinishDateForm && <UpdateSeriesContext.Provider value={{ id, setShowFinishDateForm, setLastSeenEpisode, setNumLastSeenEpisode }}><FinishSeriesAPI /></UpdateSeriesContext.Provider>
                }

                <input type="button" value="Agregar personaje (TheTVDB)" onClick={showHideNewTheTVDBCharacters} />
                <input type="button" value="Ocultar personajes (TheTVDB)" onClick={toggleShowTheTVDB} /><br/>
                <input type="number" placeholder='Temporada' min="0" max={seasons} value={seasonCharacters} onChange={setSeason} />
                <input type="button" value="Agregar personaje (TMDB)" onClick={showHideNewTMDBCharacters} />
                <input type="button" value="Ocultar personajes (TMDB)" onClick={toggleShowTMDB} />
                {
                    showAddCharacterForm && <NewCharacterContext.Provider value={{ setShowAddCharacterForm, characterToAdd, isCharacterFromScratch }}><AddCharacterAPI /></NewCharacterContext.Provider>
                }
                {
                    showTheTVDBNewCharacters && renderNewCharacters(newTheTVDBCharacters)
                }
                {
                    showTMDBNewCharacters && renderNewCharacters(newTMDBCharacters)
                }
            </div>
    )
}

export default Serie;