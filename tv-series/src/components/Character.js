import React from "react";
import './../App.css'
import { getImageURL } from "./api/tmdb";

const Character = ({character}) => {
    const { name, actor, votes, profile_path, character_path, gender } = character

    return (
        <div className="rowC">
            <div>
            {
                character_path? <img alt="character" src={character_path} width={100}/> :
                <img alt="actor" src={getImageURL(profile_path)} width={100}/>
            }
            </div>
            <div>
                <h3>{name}</h3>
                <h5>Interpretad{gender == 2? "o" : "a"} por {actor}</h5>
                Votos: {votes}
            </div>
        </div>
    )
}

export default Character