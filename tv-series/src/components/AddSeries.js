import React, { Component } from 'react'
import TextField from "@mui/material/TextField";
import { getPossibleSeries } from '../api/tmdb';
import axios from 'axios'
import NewSeriesList from './NewSeriesList';
import { Link } from 'react-router-dom';


export default class AddSeries extends Component {

    state = {
        title: "",
        year: 0,
        results: {}
    }

    setTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    setYear = (e) => {
        this.setState({
            year: e.target.value
        })
    }

    searchSeries = async () => {
        const url = getPossibleSeries(this.state.title, this.state.year)
        const { data } = await axios.get(url)
        const { results } = data
        this.setState({
            results: results
        })
    }

    render() {
        return (
            <>
            <Link to="/">Pagina principal</Link>
            <br/>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={this.setTitle}
                    variant="outlined"
                    fullWidth
                    label="Título"
                />
                <input 
                    type="number" 
                    placeholder="Año"
                    onChange={this.setYear}
                />
                <input type="button" onClick={this.searchSeries} value="Buscar"/>
                {
                    this.state.results && <NewSeriesList series={this.state.results} />
                }
            </div>
            </>
        )
    }

}
