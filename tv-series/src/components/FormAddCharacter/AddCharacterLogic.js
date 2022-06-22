import AddCharacterView from "./AddCharacterView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addNewCharacterAction } from "../../store/actions/characters";

const AddCharacterFormSchema = yup.object().shape({
    series_id: yup.number(), 
    actor_id: yup.number(), name: yup.string(), 
    gender: yup.number(), actor: yup.string(), profile_path: yup.string(), 
    character_path: yup.string(), votes: yup.number(), 
    api_data: yup.number()
});

const AddCharacterLogic = ({ defaultValues, onSubmit }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(AddCharacterFormSchema)
  });

  const handleSubmit = async (data) => {
    await onSubmit(data)
      .then((response) => {
        dispatch(addNewCharacterAction(response.data))
        navigate(-1)
      })
      .catch((err) => console.error(err));
  };

  return <AddCharacterView form={form} onSubmit={handleSubmit} />;
};

export default AddCharacterLogic;
