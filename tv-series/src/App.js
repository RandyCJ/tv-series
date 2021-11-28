import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//Components
import Series from './components/Series';

export default class App extends Component {

  onClickUpdateLastDate = () => {

  }

  render() {
    return (
      <div>
        <Router>
          <Link to="/">Pagina principal</Link>
          <br/>
          <Link to="/series">Series</Link>
          <br/>
          <Link to="/series">Estadisticas</Link>

          <form className="formLastDate" onSubmit={this.onClickUpdateLastDate}>
            <h4>Seleccione ultima fecha de visualizacion</h4>
            <input type="date"/>
            <button type="submit">Actualizar</button>
          </form>

          <Routes>
            <Route path="/series" element={<Series/>} />
          </Routes>
          
        </Router>    
      </div>
    )
  }
}
