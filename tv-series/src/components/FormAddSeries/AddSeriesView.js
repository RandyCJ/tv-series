import { getImageURL } from "../../api/tmdb";
import { getImageItem } from "../ImageListItem";
import { getTVMazeShows } from "../../api/tmdb";
import { useState, useEffect } from "react";
import axios from "axios";
import './../../App.css'

const buildTVMazeSeries = (series, onClickFunction) => {
    var seriesInfo = []
    for (var i=0; i<series.length; i++){
        const { show } = series[i]
        const poster = show.image? show.image.medium : "/notAvailable.png"
        const item = show.id
        const name = `(${show.id}) ${show.name}`
        const data = { id: show.id, image: poster, name, icon: 1 }
        const newItem = { item, data, onClickFunction: onClickFunction }
        seriesInfo.push(newItem)
    }

    return seriesInfo
}

const AddSeriesView = ({ form, onSubmit, data }) => {
    const { formState, register, handleSubmit } = form;
    const { errors, isSubmitting } = formState;
    const { poster_path } = form.control._formValues
    const poster = poster_path? getImageURL(poster_path) : "/notAvailable.png"

    const [tvMazeSeries, setTvMazeSeries] = useState([])
    const [selectedTvMazeSeriesID, setSelectedTvMazeSeriesID] = useState("")
    
    const onChangeTVMazeID = (e) => {
        setSelectedTvMazeSeriesID(e.target.value)
    }

    const addTVMazeID = (selectedSeries) => {
        console.log(selectedSeries)
        setSelectedTvMazeSeriesID(selectedSeries)
    }

    useEffect(() => {
        const url = getTVMazeShows(data.name)
        axios.get(url).then((response) => {
        const tvMazeSeries = buildTVMazeSeries(response.data, addTVMazeID)
        setTvMazeSeries(tvMazeSeries)
    })
    }, [data])

    return (
        <div>
        <div className="rowC">
            <div>
                { <img alt="poster" src={poster} width={200} /> }
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                <label>Nombre de la serie</label>
                <div>
                    <input
                    type="text"
                    placeholder="Nombre de la serie"
                    {...register("name")}
                    />
                </div>
                <div>{errors?.name?.message}</div>
                </div>

                <div>
                <label>Año de inicio</label>
                <div>
                    <input
                    type="number"
                    placeholder="Año inicio"
                    {...register("year")}
                    />
                </div>
                <div>{errors?.year?.message}</div>
                </div>

                <div>
                <label>Año final</label>
                <div>
                    <input
                    type="number"
                    placeholder="Año final"
                    {...register("finale_year")}
                    />
                </div>
                <div>{errors?.finale_year?.message}</div>
                </div>

                <div>
                <label>Fecha de inicio</label>
                <div>
                    <input
                    type="date"
                    placeholder="Fecha inicio"
                    {...register("start_date")}
                    />
                </div>
                <div>{errors?.start_date?.message}</div>
                </div>
        
                <div>
                <label>TVMaze ID</label>
                <div>
                    <input type="number" placeholder="TVMaze ID" {...register("tvmaze_id")} value={selectedTvMazeSeriesID} onChange={onChangeTVMazeID}/>
                </div>
                <div>{errors?.votes?.message}</div>
                </div>
        
                <button disabled={isSubmitting} type="submit">
                Agregar serie
                </button>
            </form>
        </div>
        <br/>
        Seleccione el show correspondiente de los que salen abajo, ingrese a la caja de texto de TVMaze ID antes de guardar la serie<br/>
        {tvMazeSeries.map(serie => {
            return getImageItem(serie)

        })}
        </div>
    );
  };
  
  export default AddSeriesView;
  