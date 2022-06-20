import AddCharacterLogic from "./AddCharacterLogic";
import { useLocation } from 'react-router-dom';
import { addNewCharacter } from '../../api/nodeAPI';
import axios from "axios";

const AddCharacterAPI = () => {

  const data = useLocation().state.character

  const handleSubmit = async (data) => {

    // return async function to submit data to backend
    return axios.post(addNewCharacter(data.series_id), data)
    // return fetch(addNewCharacter(data.series_id), {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // });
  };

  const defaultValues = { 
    series_id: data.series_id, 
    actor_id: data.actor_id, name: data.name, 
    gender: data.gender, actor: data.actor, profile_path: data?.profile_path?? "", 
    character_path: data?.character_path?? "", votes: data.votes, 
    api_data: data.api_data 
  }

  return (
    <AddCharacterLogic defaultValues={defaultValues} onSubmit={handleSubmit} />
  );
};

export default AddCharacterAPI;
