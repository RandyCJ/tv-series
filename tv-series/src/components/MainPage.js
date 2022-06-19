import React from 'react'
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <Link to="/">Pagina principal</Link>
            <br/>
            <Link to="/series">Series</Link>
            <br/>
            <Link to="/estadisticas">Estadisticas</Link>
            <br/>
            <Link to="/nueva_serie">Agregar nueva serie</Link>

            <form className="formLastDate">
                <h4>Seleccione ultima fecha de visualizacion</h4>
                <input type="date"/>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    )
}

export default MainPage