import FinishSeriesLogic from "./FinishSeriesLogic";
import { updateSeriesURL } from '../../api/nodeAPI';
import { UpdateSeriesContext } from "../Serie";
import { useContext } from "react";
import axios from "axios";

const FinishSeriesAPI = () => {
    const { id, setShowFinishDateForm } = useContext(UpdateSeriesContext)

    const handleSubmit = async (data) => {
        // return async function to submit data to backend
        data.last_seen_ep = data.last_ep
        data.finish_date = data.finish_date.toISOString().substring(0,10)
        return axios.put(updateSeriesURL(id), data)
    };

    var curr = new Date();
    curr.setDate(curr.getDate() - 1);
    var date = curr.toISOString().substring(0,10);

    const defaultValues = { 
        id: id, 
        finish_date: date, 
        last_ep: "",
        num_last_ep: null,
        last_seen_ep: ""
    }

    return (
        <FinishSeriesLogic defaultValues={defaultValues} onSubmit={handleSubmit} setShowFinishDateForm={setShowFinishDateForm} />
    );
};

export default FinishSeriesAPI;
