import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';

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
            <Route path="/series" element={<Series/>} />
          </Routes>
          
        </Router>    
      </div>
    )
  }
}
