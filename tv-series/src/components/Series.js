import { Link } from 'react-router-dom';
import { getImageURL } from '../api/tmdb';
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { getImageCard } from './ImageListItem';
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

            <FormGroup row>
                <FormControlLabel
                    control={<Checkbox checked={filteredSeries} onChange={changeSeries} />}
                    label="Series que estoy viendo"
                />
                <FormControlLabel
                    control={<Checkbox checked={unfinishedSeries} onChange={changeToUnfinishedSeries} />}
                    label="Series no finalizadas"
                />
            </FormGroup>

            <br/>

            <Grid container spacing={2} justifyContent="left">
                { 
                currentList.map((item) => {
                    const poster = item.poster_path? getImageURL(item.poster_path) : "/notAvailable.png"
                    const data = { id: item.id, image: poster, name: item.name, icon: 0 }
                    return (
                        getImageCard({item, data, onClickFunction: onClickSeries})
                    )
                })
                }
            </Grid>
        </>
    );

}


export default Series
