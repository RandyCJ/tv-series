import React, { Component } from 'react'
import { getImageURL } from '../api/tmdb'
import ImageList from '@mui/material/ImageList';
import { getImageItem } from './ImageListItem';

export default class NewSeriesList extends Component 
{

    addSeries = (item) => {
        console.log(item.id)
        console.log(item.name)
    }

    render() {
        var json = this.props.series
        var arr = []
        Object.keys(json).forEach(function(key) {
            arr.push(json[key])
        })

        const onClickSeries = (serie) => {
            console.log("Selecciono " + serie.name)
        }
        
        return (
            <>
            <ImageList cols={3} sx={{ width: 600}}>
            {arr.map((item) => {
                const poster = item.poster_path? getImageURL(item.poster_path) : "/notAvailable.png"
                const data = { id: item.id, image: poster, name: item.name, icon: 1 }
                return (
                    getImageItem({item, data, onClickFunction: onClickSeries})
                )
            })}
            </ImageList>
            </>
        )
    }
}
