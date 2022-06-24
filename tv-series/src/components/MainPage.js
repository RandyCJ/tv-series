import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { fetchAllSeries } from '../store/actions/series';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
    const { seriesList: series } = useSelector(state => state.series)
    const dispatch = useDispatch()

    useEffect(() => {
        if (series.length === 0){
            dispatch(fetchAllSeries())
        }
    }, [dispatch, series.length])

    return (
        <div>
            <Link to="/">Pagina principal</Link>
            <br/>
            <Link to="/series">Series</Link>
            <br/>
            <Link to="/estadisticas">Estadisticas</Link>
            <br/>
            <Link to="/buscar_serie">Agregar nueva serie</Link>

            <form className="formLastDate">
                <h4>Seleccione ultima fecha de visualizacion</h4>
                <input type="date"/>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    )
}

export default MainPage