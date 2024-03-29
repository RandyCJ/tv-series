import AddSeriesView from "./AddSeriesView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { addNewSeriesAction } from "../../store/actions/series";
import { useNavigate } from "react-router-dom";

const AddSeriesFormSchema = yup.object().shape({
    id: yup.number(), 
    name: yup.string(), 
    year: yup.number(),
    start_date: yup.date().nullable().transform((value) => (isNaN(value) ? null : value)),
    poster_path: yup.string(),
    wallpaper_path: yup.string(),
    tvmaze_id: yup.number().nullable().default(null),
    seasons: yup.number(),
    finale_year: yup.number().nullable().transform((value) => (isNaN(value) ? null : value))
});

const AddSeriesLogic = ({ defaultValues, onSubmit, data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(AddSeriesFormSchema)
  });

  const handleSubmit = async (data) => {
    await onSubmit(data)
      .then((response) => {
        dispatch(addNewSeriesAction(response.data))
        navigate('/')
      })
      .catch((err) => console.error(err));
  };

  return <AddSeriesView form={form} onSubmit={handleSubmit} data={data}/>;
};

export default AddSeriesLogic;
