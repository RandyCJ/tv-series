import React from "react";
import './../App.css'
import { getImageURL } from "../api/tmdb";

const Character = ({character}) => {
    const { name, actor, votes, profile_path, gender } = character
    const actor_photo = profile_path ? getImageURL(profile_path) : '/notAvailable.png'
    return (
        <div className="rowC">
            <div>
                <img alt="actor" src={actor_photo} width={100}/>
            </div>
            <div>
                <h3>{name}</h3>
                <h5>Interpretad{gender === 2? "o" : "a"} por {actor}</h5>
                Votos: {votes}
            </div>
        </div>
    )
}

export default Character