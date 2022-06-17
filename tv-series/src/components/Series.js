import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getImageURL } from '../api/tmdb';
import { useNavigate } from "react-router-dom";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { fetchAllSeries } from '../store/slices/series';
import { useDispatch, useSelector } from 'react-redux';

const Series = () =>  {

    const dispatch = useDispatch()
    const { seriesList: series } = useSelector(state => state.series)

    useEffect(() => {
        dispatch(fetchAllSeries())
    }, [dispatch])

    const navigate = useNavigate()
    
    const onClickSeries = (serie) => {
        navigate(`/series/${serie.id}`)
    }

    return (
        <>
            <Link to="/">Pagina principal</Link>
            <br/>
            <ImageList cols={7} sx={{ width: 1000}}>
            { series.map((item) => {
                const poster = item.poster_path? getImageURL(item.poster_path) : "/notAvailable.png"
                return (
                    <ImageListItem key={item.id} onClick={() => onClickSeries(item)}>
                    <img
                        src={`${poster}?w=248&fit=crop&auto=format`}
                        srcSet={`${poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
                )
            })}
            </ImageList>
        </>
    );

}


export default Series
