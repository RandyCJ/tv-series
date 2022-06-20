import AddCharacterView from "./AddCharacterView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface AddCharacterModel {
    series_id: number, 
    actor_id: number, name: string, 
    gender: number, actor: string, profile_path: string, 
    character_path: string, votes: number, 
    api_data: number
}

const AddCharacterFormSchema = yup.object().shape({
    series_id: yup.number(), 
    actor_id: yup.number(), name: yup.string(), 
    gender: yup.number(), actor: yup.string(), profile_path: yup.string(), 
    character_path: yup.string(), votes: yup.number(), 
    api_data: yup.number()
});

interface Props {
  defaultValues: AddCharacterModel;
  onSubmit: (data: AddCharacterModel) => Promise<Response>;
}

const AddCharacterLogic = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<AddCharacterModel>({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(AddCharacterFormSchema)
  });

  const handleSubmit = async (data: AddCharacterModel) => {
    await onSubmit(data)
      .then(() => form.reset(data))
      .catch((err) => console.error(err));
  };

  return <AddCharacterView form={form} onSubmit={handleSubmit} />;
};

export default AddCharacterLogic;
