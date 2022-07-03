const AddCharacterView = ({ form, onSubmit, setShowAddCharacterForm, isCharacterFromScratch }) => {
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

      <div hidden={!isCharacterFromScratch}>
        <label>Nombre del Actor o actriz</label>
        <div>
          <input
            type="text"
            placeholder="Nombre actor"
            {...register("actor")}
          />
        </div>
        <div>{errors?.actor?.message}</div>
      </div>

      <div hidden={!isCharacterFromScratch}>
        <label>Género</label>
        <div>
          <select {...register("gender")}>
            <option value="0">Otro</option>
            <option value="1">Mujer</option>
            <option value="2">Hombre</option>
          </select>
        </div>
        <div>{errors?.gender?.message}</div>
      </div>

      <div hidden={!isCharacterFromScratch}>
        <label>Foto del personaje</label>
        <div>
          <input
            type="text"
            placeholder="Foto personaje"
            {...register("character_path")}
          />
        </div>
        <div>{errors?.character_path?.message}</div>
      </div>

      <div hidden={!isCharacterFromScratch}>
        <label>Foto del actor</label>
        <div>
          <input
            type="text"
            placeholder="Foto actor"
            {...register("profile_path")}
          />
        </div>
        <div>{errors?.profile_path?.message}</div>
      </div>

      <button disabled={isSubmitting} type="submit">
        Agregar personaje
      </button>
      <input type="button" onClick={() => setShowAddCharacterForm(false)} value={"Ocultar formulario"}/>
    </form>
  );
};

export default AddCharacterView;
