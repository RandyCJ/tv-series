import FinishSeriesView from "./FinishSeriesView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { updateSeriesAction } from "../../store/actions/series";

const FinishSeriesFormSchema = yup.object().shape({
    id: yup.number(), 
    finish_date: yup.date(), 
    last_ep: yup.string(), 
    num_last_ep: yup.number(), 
    last_seen_ep: yup.string(), 
});

const FinishSeriesLogic = ({ defaultValues, onSubmit, setShowFinishDateForm }) => {
  const dispatch = useDispatch()

  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(FinishSeriesFormSchema)
  });

  const handleSubmit = async (data) => {
    await onSubmit(data)
      .then(() => {
        dispatch(updateSeriesAction(data))
        setShowFinishDateForm(false)
      })
      .catch((err) => console.error(err));
  };

  return <FinishSeriesView form={form} onSubmit={handleSubmit} setShowFinishDateForm={setShowFinishDateForm} />;
};

export default FinishSeriesLogic;
