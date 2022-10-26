import { getImageURL } from "../../api/tmdb";
import './../../App.css'

const EditSeriesView = ({ form, onSubmit, data }) => {
    const { formState, register, handleSubmit } = form;
    const { errors, isSubmitting } = formState;
    const { poster_path } = form.control._formValues
    const poster = poster_path? getImageURL(poster_path) : "/notAvailable.png"

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
        </div>
    );
  };
  
  export default EditSeriesView;
  