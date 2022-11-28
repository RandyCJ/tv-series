import { getImageURL, getSeriesImagesURL } from "../../api/tmdb";
import { useState } from "react";
import { getImageItem2 } from '../ImageListItem';
import ImageList from '@mui/material/ImageList';
import './../../App.css'
import axios from "axios";

const renderSeriesPosters = (seriesPosters) => {
    return (
        <ImageList cols={5} sx={{ width: 1000}}>
            {seriesPosters.map((poster) => getImageItem2(poster))}
        </ImageList>
    )
}

const buildSeriesPosters = (posters, onClickFunction) => {
    var seriesPosters = []
    for (var i=0; i<posters.length; i++){
        const poster = posters[i].file_path
        const item = poster
        const name = ""
        const data = { id: item, image: getImageURL(poster), name }
        const newItem = { item, data, onClickFunction: onClickFunction }
        seriesPosters.push(newItem)
    }
    return seriesPosters
}

const EditSeriesView = ({ form, onSubmit, data }) => {
    const { formState, register, handleSubmit } = form;
    const { errors, isSubmitting } = formState;
    const { poster_path } = form.control._formValues
    const [poster, setPoster] = useState(poster_path? getImageURL(poster_path) : "/notAvailable.png")

    const [showSeriesPosters, setShowSeriesPosters] = useState(true)
    const [seriesPosters, setSeriesPosters] = useState([])

    const [selectedSeriesPoster, setSelectedSeriesPoster] = useState(poster_path)

    const onChangeSeriesPoster = (e) => {
        setSelectedSeriesPoster(e.target.value)
    }

    const addSeriesPosterURL = (selectedPosterURL) => {
        setSelectedSeriesPoster(selectedPosterURL)
        setPoster(getImageURL(selectedPosterURL))
    }

    const loadSeriesPosters = async (seriesID) => {
        const url = getSeriesImagesURL(seriesID)
        const { data } = await axios.get(url)
        const posters = buildSeriesPosters(data.posters, addSeriesPosterURL)
        setSeriesPosters(posters)
        setShowSeriesPosters(true)
    }

    const showPosters = () => {
        setShowSeriesPosters(true)
        if (seriesPosters.length === 0){
            loadSeriesPosters(data.id)
        }
    }

    const hidePosters = () => {
        setShowSeriesPosters(false)
    }


    return (
        <div>
        <div className="rowC">
            <div>
                { <img alt="poster" src={poster} width={230} /> } <br />
                <input type="button" value="Cambiar poster" onClick={showPosters} />
                <input type="button" value="Ocultar posters" onClick={hidePosters} />
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
                <label>Fecha de finalización</label>
                <div>
                    <input
                    type="date"
                    placeholder="Fecha final"
                    {...register("finish_date")}
                    />
                </div>
                <div>{errors?.finish_date?.message}</div>
                </div>

                <div>
                <label>URL Poster</label>
                <div>
                    <input
                    type="text"
                    placeholder="URL Poster"
                    {...register("poster_path")}
                    value={selectedSeriesPoster}
                    onChange={onChangeSeriesPoster}
                    />
                </div>
                <div>{errors?.poster_path?.message}</div>
                </div>

                <div>
                <label>URL Wallpaper</label>
                <div>
                    <input
                    type="text"
                    placeholder="URL Wallpaper"
                    {...register("wallpaper_path")}
                    />
                </div>
                <div>{errors?.wallpaper_path?.message}</div>
                </div>

                <div>
                <label>Temporadas</label>
                <div>
                    <input
                    type="number"
                    placeholder="Temporadas"
                    {...register("seasons")}
                    />
                </div>
                <div>{errors?.seasons?.message}</div>
                </div>
        
                <div>
                <label>TVMaze ID</label>
                <div>
                    <input type="number" placeholder="TVMaze ID" {...register("tvmaze_id")}/>
                </div>
                <div>{errors?.votes?.message}</div>
                </div>
        
                <button disabled={isSubmitting} type="submit">
                Actualizar serie
                </button>
            </form>
        </div>
        <br/>
        {
            showSeriesPosters && renderSeriesPosters(seriesPosters)
        }
        </div>
    );
  };
  
  export default EditSeriesView;
  