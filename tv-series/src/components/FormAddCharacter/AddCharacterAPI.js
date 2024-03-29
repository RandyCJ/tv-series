import AddCharacterLogic from "./AddCharacterLogic";
import { addNewCharacter } from '../../api/nodeAPI';
import axios from "axios";
import { NewCharacterContext } from "../Serie";
import { useContext } from "react";

const AddCharacterAPI = () => {

  const { setShowAddCharacterForm, characterToAdd, isCharacterFromScratch } = useContext(NewCharacterContext)
  const data = characterToAdd

  const handleSubmit = async (data) => {
    // return async function to submit data to backend
    return axios.post(addNewCharacter(data.series_id), data)
  };

  const defaultValues = { 
    series_id: data.series_id, 
    actor_id: data.actor_id?? null, name: data.name.replace(" (voice)", ""), 
    gender: data.gender, actor: data.actor, profile_path: data?.profile_path?? "", 
    character_path: data?.character_path?? "", votes: data.votes, 
    api_data: data.api_data
  }

  return (
    <AddCharacterLogic defaultValues={defaultValues} onSubmit={handleSubmit} setShowAddCharacterForm={setShowAddCharacterForm} isCharacterFromScratch={isCharacterFromScratch}/>
  );
};

export default AddCharacterAPI;
