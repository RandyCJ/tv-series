import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class MainPage extends Component {
    render() {
        return (
            <div>
                <Link to="/">Pagina principal</Link>
                <br/>
                <Link to="/series">Series</Link>
                <br/>
                <Link to="/estadisticas">Estadisticas</Link>

                <form className="formLastDate" onSubmit={this.props.onClickUpdateLastDate}>
                    <h4>Seleccione ultima fecha de visualizacion</h4>
                    <input type="date"/>
                    <button type="submit">Actualizar</button>
                </form>
            </div>
        )
    }
}
