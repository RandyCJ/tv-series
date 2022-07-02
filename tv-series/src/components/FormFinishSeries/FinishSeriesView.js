import './../../App.css'

const FinishSeriesView = ({ form, onSubmit, setShowFinishDateForm }) => {
    const { formState, register, handleSubmit } = form;
    const { errors, isSubmitting } = formState;
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                <label>Fecha de finalización</label>
                <div>
                    <input
                    type="date"
                    placeholder="Fecha finalización"
                    {...register("finish_date")}
                    />
                </div>
                <div>{errors?.finish_date?.message}</div>
                </div>

                <div>
                <label>Último capítulo disponible (ej: 5x10)</label>
                <div>
                    <input
                    type="text"
                    placeholder="Último capítulo"
                    {...register("last_ep")}
                    />
                </div>
                <div>{errors?.last_ep?.message}</div>
                </div>

                <div>
                <label>Número último capítulo disponible (ej: 50)</label>
                <div>
                    <input
                    type="number"
                    placeholder="Número último capítulo"
                    {...register("num_last_ep")}
                    />
                </div>
                <div>{errors?.num_last_ep?.message}</div>
                </div>
        
                <button disabled={isSubmitting} type="submit">
                Marcar serie como vista
                </button>
                <input type="button" onClick={() => setShowFinishDateForm(false)} value={"Ocultar formulario"}/>
            </form>
        </div>
    );
  };
  
  export default FinishSeriesView;
  