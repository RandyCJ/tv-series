import AddSeriesLogic from "./AddSeriesLogic";
import { addNewSeriesURL } from '../../api/nodeAPI';
import axios from "axios";
import { useLocation } from 'react-router-dom';

const AddSeriesAPI = () => {
    const data = useLocation().state.currentSeries

    const handleSubmit = async (data) => {
        // return async function to submit data to backend
        return axios.post(addNewSeriesURL(), data)
    };

    const defaultValues = { 
        id: data.id, 
        name: data.name?? "", 
        year: data.year?? null,
        start_date: null,
        poster_path: data?.poster_path?? "",
        wallpaper_path: data?.wallpaper_path?? "",
        tvmaze_id: data.tvmaze_id?? null,
        seasons: data.seasons?? null,
        finale_year: data.finale_year?? null
    }

    return (
        <AddSeriesLogic defaultValues={defaultValues} onSubmit={handleSubmit} data={data}/>
    );
};

export default AddSeriesAPI;
