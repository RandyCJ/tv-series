import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getImageURL } from '../api/tmdb';
import { useNavigate } from "react-router-dom";

import ImageList from '@mui/material/ImageList';
import { getImageItem } from './ImageListItem';
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
                const data = { id: item.id, image: poster, name: item.name, icon: 0 }
                return (
                    getImageItem({item, data, onClickFunction: onClickSeries})
                )
            })}
            </ImageList>
        </>
    );

}


export default Series
