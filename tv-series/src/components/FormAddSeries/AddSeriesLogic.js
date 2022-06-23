import AddSeriesView from "./AddSeriesView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { addNewSeriesAction } from "../../store/actions/series";

const AddSeriesFormSchema = yup.object().shape({
    id: yup.number(), 
    name: yup.string(), 
    year: yup.number(),
    start_date: yup.date(),
    poster_path: yup.string(),
    wallpaper_path: yup.string(),
    tvmaze_id: yup.number(),
    seasons: yup.number()
});

const AddSeriesLogic = ({ defaultValues, onSubmit, tvMazeSeries }) => {
  const dispatch = useDispatch()

  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(AddSeriesFormSchema)
  });

  const handleSubmit = async (data) => {
    await onSubmit(data)
      .then((response) => {
        dispatch(addNewSeriesAction(response.data))
      })
      .catch((err) => console.error(err));
  };

  return <AddSeriesView form={form} onSubmit={handleSubmit} tvMazeSeries={tvMazeSeries}/>;
};

export default AddSeriesLogic;
