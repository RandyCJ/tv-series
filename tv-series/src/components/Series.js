import React from 'react'
import { Link } from 'react-router-dom';
import { getImageURL } from '../api/tmdb';
import { useNavigate } from "react-router-dom";

import ImageList from '@mui/material/ImageList';
import { getImageItem } from './ImageListItem';
import { useDispatch, useSelector } from 'react-redux';
import { switchFilteredSeriesAction, switchUnfinishedSeriesAction } from '../store/actions/series';

const Series = () =>  {
    const dispatch = useDispatch()
    const { seriesList: series } = useSelector(state => state.series)
    const { filteredSeries, unfinishedSeries } = useSelector(state => state.series)
    const filteredSeriesList = series.filter((serie) => serie.start_date && !serie.finish_date)
    const unfinishedSeriesList = series.filter((serie) => !serie.finale_year)

    const navigate = useNavigate()
    
    const onClickSeries = (serie) => {
        navigate(`/series/${serie.id}`)
    }

    const changeSeries = () => {
        dispatch(switchFilteredSeriesAction())
    }

    const changeToUnfinishedSeries = () => {
        dispatch(switchUnfinishedSeriesAction())
    }

    const currentList = filteredSeries? filteredSeriesList : unfinishedSeries? unfinishedSeriesList : series

    return (
        <>
            <Link to="/">Pagina principal</Link>
            <br/>
            <div>
                <label>Series que estoy viendo</label>  <input checked={filteredSeries} type="checkbox" onChange={changeSeries} />
                <label>Series no finalizadas</label>  <input checked={unfinishedSeries} type="checkbox" onChange={changeToUnfinishedSeries} />
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
