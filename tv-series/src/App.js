import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddSeries from './components/AddSeries';
import MainPage from './components/MainPage';
import Serie from './components/Serie';

//Components
import Series from './components/Series';

export default class App extends Component {

  onClickUpdateLastDate = () => {

  }

  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage onClickUpdateLastDate={this.onClickUpdateLastDate}/>} />
            <Route path="/series/:id" element={<Serie/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/nueva_serie" element={<AddSeries/>} />
          </Routes>
          
        </Router>    
      </div>
    )
  }
}
