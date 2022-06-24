import React from 'react'
import { Link } from 'react-router-dom';
import { getImageURL } from '../api/tmdb';
import { useNavigate } from "react-router-dom";

import ImageList from '@mui/material/ImageList';
import { getImageItem } from './ImageListItem';
import { useDispatch, useSelector } from 'react-redux';
import { switchFilteredSeriesAction } from '../store/actions/series';

const Series = () =>  {
    const dispatch = useDispatch()
    const { seriesList: series } = useSelector(state => state.series)
    const { filteredSeries } = useSelector(state => state.series)
    const filteredSeriesList = series.filter((serie) => serie.start_date && !serie.finish_date)

    const navigate = useNavigate()
    
    const onClickSeries = (serie) => {
        navigate(`/series/${serie.id}`)
    }

    const changeSeries = () => {
        dispatch(switchFilteredSeriesAction())
    }

    const currentList = filteredSeries? filteredSeriesList : series

    return (
        <>
            <Link to="/">Pagina principal</Link>
            <br/>
            <div>
                <label>Mostrar solo series activas</label>  <input checked={filteredSeries} type="checkbox" onChange={changeSeries} />
            </div>
            <ImageList cols={7} sx={{ width: 1000}}>
            { 
            currentList.map((item) => {
                const poster = item.poster_path? getImageURL(item.poster_path) : "/notAvailable.png"
                const data = { id: item.id, image: poster, name: item.name, icon: 0 }
                return (
                    getImageItem({item, data, onClickFunction: onClickSeries})
                )
            })
            }
            </ImageList>
        </>
    );

}


export default Series
