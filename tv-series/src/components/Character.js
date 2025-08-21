import { useState } from "react";
import './../App.css'
import { getImageURL } from "../api/tmdb";
import { addVotesToCharacterAction, deleteCharacterAction, substractVotesToCharacterAction } from "../store/actions/characters";
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from "@mui/material";
import {
  Card,
  CardContent,
  CardMedia,
  TextField
} from "@mui/material";

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
        <Card
            key={id}
            sx={{
                width: 140,
                flexShrink: 0,
                borderRadius: "10px",
                overflow: "hidden",
                background: "rgba(0,0,0,0.7)",
                color: "white",
            }}
        >
            <CardMedia
                component="img"
                height="180"
                image={actor_photo}
                alt={name}
                sx={{
                    objectFit: "cover",
                }}
            />
            <CardContent sx={{ p: 1 }}>
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    noWrap
                    sx={{
                        textShadow: "1px 1px 3px black",
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="caption"
                    color="gray"
                    noWrap
                    sx={{
                        fontStyle: "italic",
                    }}
                >
                {actor}
                </Typography>
    
                {/* Votos */}
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 0.5 }}>
                    Votos: {votes}
                </Typography>
        
                {/* Botones */}
                <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        sx={{ minWidth: 28, p: 0 }}
                        onClick={substractVotes}
                    >
                        –
                    </Button>
                    <TextField
                        type="number"
                        size="small"
                        min={1}
                        value={newVotes}
                        onChange={onChangeNewVotes}
                        inputProps={{ min: 1, style: { textAlign: "center", width: 28 } }}
                        sx={{
                            width: 50,
                            '& .MuiInputBase-root': {
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                borderRadius: 1,
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255,255,255,0.6)',
                            },
                            '& input': {
                                color: 'white',
                                MozAppearance: 'textfield',
                                    '&::-webkit-outer-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '&::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                            },
                            '& input::placeholder': {
                                color: 'rgba(255,255,255,0.7)',
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{ minWidth: 28, p: 0 }}
                        onClick={addVotes}
                    >
                        +
                    </Button>
                </Box>
                <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        fullWidth
                        sx={{ minWidth: 28, p: 0 }}
                        onClick={deleteCharacter}
                    >
                          Eliminar  
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Character