import React from "react"
import { useLocation } from 'react-router-dom';

const FormAddCharacter = () => {

    const { character } = useLocation().state
    console.log(character)

    return (
        <>
            {character.series_id}<br/>
            {character.name}<br/>
            {character.actor_id}<br/>
            {character.actor}<br/>
            {character.gender}<br/>
            {character.profile_path && <img alt="actor" src={character.profile_path} />}<br/>
            {character.character_path && <img alt="character" src={character.character_path} />}<br/>
        </>
    )
}

export default FormAddCharacter