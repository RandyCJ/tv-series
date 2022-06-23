import AddSeriesLogic from "./AddSeriesLogic";
import { addNewSeriesURL } from '../../api/nodeAPI';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { getTVMazeShows } from "../../api/tmdb";
import { useState } from "react";

const buildTVMazeSeries = (series, onClickFunction) => {
    var seriesInfo = []
    for (var i=0; i<series.length; i++){
        const { show } = series[i]
        const poster = show.image? show.image.medium : "/notAvailable.png"
        const item = { }
        const data = { id: show.id, image: poster, name: show.name, icon: 1 }
        const newItem = { item, data, onClickFunction: onClickFunction }
        seriesInfo.push(newItem)
    }

    return seriesInfo
}

const AddSeriesAPI = () => {
    const data = useLocation().state.currentSeries
    const [tvMazeSeries, setTvMazeSeries] = useState([])

    const handleSubmit = async (data) => {
        // return async function to submit data to backend
        return axios.post(addNewSeriesURL(), data)
    };

    const addTVMazeID = (tvMazeID) => {
        data.tvmaze_id = tvMazeID
    }

    useEffect(() => {
        const url = getTVMazeShows(data.name)
        console.log(url)
        axios.get(url).then((response) => {
            const tvMazeSeries = buildTVMazeSeries(response.data)
            console.log(tvMazeSeries)
            setTvMazeSeries(tvMazeSeries)
        })
    }, [data])
    

    const defaultValues = { 
        id: data.id, 
        name: data.name?? "", 
        year: data.year?? null,
        start_date: data.start_date?? "",
        poster_path: data?.poster_path?? "",
        wallpaper_path: data?.wallpaper_path?? "",
        tvmaze_id: data.tvmaze_id?? null,
        seasons: data.seasons?? null
    }

    return (
        <AddSeriesLogic defaultValues={defaultValues} onSubmit={handleSubmit} tvMazeSeries={tvMazeSeries}/>
    );
};

export default AddSeriesAPI;
