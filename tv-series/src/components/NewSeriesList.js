import React from 'react'
import { getImageURL, getSeriesInfo } from '../api/tmdb'
import ImageList from '@mui/material/ImageList';
import { getImageItem } from './ImageListItem';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const buildSeriesObject = async (serie) => {
    const url = getSeriesInfo(serie.id)
    const { data } = await axios.get(url)
    const currentSeason = data.seasons? data.seasons.slice(-1)[0].season_number : null
    const year = serie.first_air_date.slice(0, 4)
    const currentSeries = {
        id: serie.id,
        name: serie.name,
        year: parseInt(year),
        start_date: "",
        poster_path: serie.poster_path,
        wallpaper_path: serie.backdrop_path,
        seasons: currentSeason
    }
    return currentSeries
}

const NewSeriesList = ({ series }) =>  {

    var json = series
    var arr = []
    Object.keys(json).forEach(function(key) {
        arr.push(json[key])
    })

    const navigate = useNavigate()

    const onClickSeries = async (serie) => {
        const currentSeries = await buildSeriesObject(serie)
        navigate(`/agregar_serie`, {state: {currentSeries}})
    }

    return (
        <>
        <ImageList cols={3} sx={{ width: 600}}>
        {arr.map((item) => {
            const poster = item.poster_path? getImageURL(item.poster_path) : "/notAvailable.png"
            const data = { id: item.id, image: poster, name: item.name, icon: 1 }
            return (
                getImageItem({item, data, onClickFunction: onClickSeries})
            )
        })}
        </ImageList>
        </>
    )
}

export default NewSeriesList