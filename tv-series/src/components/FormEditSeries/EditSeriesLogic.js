import EditSeriesView from "./EditSeriesView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { updateSeriesAction } from "../../store/actions/series";
import { useNavigate } from "react-router-dom";

const EditSeriesFormSchema = yup.object().shape({
    id: yup.number(), 
    name: yup.string(), 
    year: yup.number(),
    finale_year: yup.number().transform((value) => (isNaN(value) ? null : value)),
    start_date: yup.date().nullable().transform((value) => (isNaN(value) ? null : value)),
    finish_date: yup.date().nullable().transform((value) => (isNaN(value) ? null : value)),
    poster_path: yup.string().nullable(),
    wallpaper_path: yup.string().nullable(),
    tvmaze_id: yup.number().nullable().default(null),
    seasons: yup.number()
});

const EditSeriesLogic = ({ defaultValues, onSubmit, data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(EditSeriesFormSchema)
  });

  const handleSubmit = async (data) => {
    data.start_date = data.start_date? data.start_date.toISOString().split('T')[0] : null
    data.finish_date = data.finish_date? data.finish_date.toISOString().split('T')[0] : null
    await onSubmit(data)
      .then(() => {
        dispatch(updateSeriesAction(data))
        navigate(-1)
      })
      .catch((err) => console.error(err));
  };

  return <EditSeriesView form={form} onSubmit={handleSubmit} data={data} />;
};

export default EditSeriesLogic;
