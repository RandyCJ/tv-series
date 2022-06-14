import React, { Component } from 'react'
import { getImageURL } from './api/tmdb'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

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
            {arr.map((item) => (
                <ImageListItem key={item.id} onClick={() => onClickSeries(item)}>
                <img
                    src={`${getImageURL(item.poster_path)}?w=248&fit=crop&auto=format`}
                    srcSet={`${getImageURL(item.poster_path)}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                    loading="lazy"
                    style={{cursor:'pointer'}}
                />
                <ImageListItemBar
                    title={item.name}
                    actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.name}`}
                    >
                        <InfoIcon />
                    </IconButton>
                    }
                />
                </ImageListItem>
            ))}
            </ImageList>
            </>
        )
    }
}
