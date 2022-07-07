import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchAllSeries } from '../store/actions/series';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLastDate, setLastDateAction } from '../store/actions/stats';

const MainPage = () => {
    const { seriesList: series } = useSelector(state => state.series)
    const { lastDate } = useSelector(state => state.stats)
    const dispatch = useDispatch()

    const [ lastDateUpdate, setLastDateUpdate ] = useState(lastDate)
    const onChangeLastDate = (e) => {
        setLastDateUpdate(e.target.value)
    }

    const updateLastDate = () => {
        dispatch(setLastDateAction(lastDateUpdate))
    }

    useEffect(() => {
        if (series.length === 0){
            dispatch(fetchLastDate())
            setLastDateUpdate(lastDate)
            dispatch(fetchAllSeries())
        }
    }, [dispatch, series.length, lastDate])

    return (
        <div>
            <Link to="/">Pagina principal</Link>
            <br/>
            <Link to="/series">Series</Link>
            <br/>
            <Link to="/estadisticas">Estadisticas</Link>
            <br/>
            <Link to="/buscar_serie">Agregar nueva serie</Link>

            <h4>Seleccione ultima fecha de visualizacion</h4>
            <input type="date" value={lastDateUpdate} onChange={onChangeLastDate}/>
            <input type="button" onClick={updateLastDate} value="Actualizar"/>
        </div>
    )
}

export default MainPage