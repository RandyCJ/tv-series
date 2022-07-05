import { getImageURL } from "../../api/tmdb";
import { getImageItem } from "../ImageListItem";
import './../../App.css'

const AddSeriesView = ({ form, onSubmit, tvMazeSeries }) => {
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
                    placeholder="Nombre personaje"
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
                    <input type="number" placeholder="TVMaze ID" {...register("tvmaze_id")} />
                </div>
                <div>{errors?.votes?.message}</div>
                </div>
        
                <button disabled={isSubmitting} type="submit">
                Agregar serie
                </button>
            </form>
        </div>
        <br/>
        Ingrese en el campo TVMazeID la id del show correspondiente de los que salen abajo <br/>
        {tvMazeSeries.map(serie => {
            return getImageItem(serie)

        })}
        </div>
    );
  };
  
  export default AddSeriesView;
  