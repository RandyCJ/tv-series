import React from 'react'
import seriesJSON from './series.json'
import { Link } from 'react-router-dom';
import { getImageURL } from './api/tmdb';
import { useNavigate } from "react-router-dom";

//import listReactFiles from 'list-react-files'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const Series = () =>  {

    const navigate = useNavigate()
    
    const onClickSeries = (serie) => {
        navigate(`/series/${serie.id}`)
    }
    
    return (
        <>
            <Link to="/">Pagina principal</Link>
            <br/>
            <ImageList cols={3} sx={{ width: 600}}>
            { seriesJSON.map((item) => (
                <ImageListItem key={item.id} onClick={() => onClickSeries(item)}>
                <img
                    src={`${getImageURL(item.poster_path)}?w=248&fit=crop&auto=format`}
                    srcSet={`${getImageURL(item.poster_path)}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                    loading="lazy"
                    style={{cursor:'pointer'}}
                />
                <ImageListItemBar
                    title={item.name}
                    actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.name}`}
                    >
                        <InfoIcon />
                    </IconButton>
                    }
                />
                </ImageListItem>
            ))}
            </ImageList>
        </>
    );

}

export default Series
