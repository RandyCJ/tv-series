import React, { Component } from 'react'
import series from './series.json'
import { Link } from 'react-router-dom';


//import listReactFiles from 'list-react-files'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default class Series extends Component {

    state = {
        series: series
    }

    componentDidMount = () => {
        const imagesPath = "/series-posters/";
        this.state.series.forEach(serie => {
            serie.image_path = imagesPath + serie.id.toString() + '/1.png';
        });
    }

    render() {

        const onClickSeries = (name) => {
            console.log("Selecciono " + name)
        }

        return (
            <>
                <Link to="/">Pagina principal</Link>
                <br/>
                <ImageList cols={3} sx={{ width: 600}}>
                {this.state.series.map((item) => (
                    <ImageListItem key={item.id} onClick={() => onClickSeries(item.name)}>
                    <img
                        src={`${item.image_path}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.image_path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.name}
                        loading="lazy"
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
          );

    }
}
