const AddCharacterView = ({ form, onSubmit, setShowAddCharacterForm }) => {
  const { formState, register, handleSubmit } = form;
  const { errors, isSubmitting } = formState;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre del personaje</label>
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
        <label>Votos</label>
        <div>
          <input type="number" placeholder="Cantidad votos" {...register("votes")} />
        </div>
        <div>{errors?.votes?.message}</div>
      </div>

      <button disabled={isSubmitting} type="submit">
        Agregar personaje
      </button>
      <input type="button" onClick={() => setShowAddCharacterForm(false)} value={"Ocultar formulario"}/>
    </form>
  );
};

export default AddCharacterView;
