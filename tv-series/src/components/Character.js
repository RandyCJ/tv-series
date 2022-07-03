import React, { useState } from "react";
import './../App.css'
import { getImageURL } from "../api/tmdb";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { addVotesToCharacterAction, deleteCharacterAction, substractVotesToCharacterAction } from "../store/actions/characters";
import { useDispatch } from 'react-redux';

const Character = ({ character, seriesID }) => {
    const { id, name, actor, votes, profile_path, character_path, gender } = character
    const actor_photo = character_path ? character_path : profile_path ? getImageURL(profile_path) : '/notAvailable.png'

    const [newVotes, setNewVotes] = useState(1)

    const onChangeNewVotes = (e) => {
        setNewVotes(e.target.value)
    }

    const dispatch = useDispatch()

    const addVotes = () => {
        dispatch(addVotesToCharacterAction(id, parseInt(newVotes), seriesID))
    }

    const substractVotes = () => {
        dispatch(substractVotesToCharacterAction(id, parseInt(newVotes), seriesID))
    }

    const deleteCharacter = () => {
        dispatch(deleteCharacterAction(id, votes, seriesID))
    }

    return (
        <div className="rowC">
            <div>
                <img alt="actor" src={actor_photo} width={100}/>
            </div>
            <div>
                <h3>{name}</h3>
                <h5>Interpretad{gender === 2? "o" : "a"} por {actor}</h5>
                Votos: {votes}<br/>
                <input type="number" min={1} value={newVotes} onChange={onChangeNewVotes} />
                <AddIcon onClick={addVotes} />
                <RemoveIcon onClick={substractVotes} />
            </div>
            <ClearIcon onClick={deleteCharacter}/>
        </div>
    )
}

export default Character