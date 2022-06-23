import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddSeries from './components/AddSeries';
import AddSeriesAPI from './components/FormAddSeries/AddSeriesAPI';
import MainPage from './components/MainPage';
import Serie from './components/Serie';

//Components
import Series from './components/Series';

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/series/:id" element={<Serie/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/buscar_serie" element={<AddSeries/>} />
            <Route path="/agregar_serie" element={<AddSeriesAPI />} />
          </Routes>
          
        </Router>    
      </div>
    )
  }
}
