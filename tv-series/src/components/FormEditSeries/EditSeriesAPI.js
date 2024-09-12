import EditSeriesLogic from "./EditSeriesLogic";
import { updateSeriesURL } from '../../api/nodeAPI';
import axios from "axios";
import { useLocation } from 'react-router-dom';

const EditSeriesAPI = () => {
    const data = useLocation().state.currentSeries

    const handleSubmit = async (data) => {
        // return async function to update series
        return axios.put(updateSeriesURL(data.id), data)
    };

    const defaultValues = { 
        id: data.id, 
        name: data.name, 
        year: data.year,
        finale_year: data.finale_year?? null,
        start_date: data.start_date?? null,
        finish_date: data.finish_date?? null,
        poster_path: data?.poster_path?? null,
        wallpaper_path: data?.wallpaper_path?? null,
        seasons: data.seasons,
        thetvdb_id: data.thetvdb_id?? null
    }

    return (
        <EditSeriesLogic defaultValues={defaultValues} onSubmit={handleSubmit} data={data} />
    );
};

export default EditSeriesAPI;
