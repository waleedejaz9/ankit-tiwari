import { setAllFormsReducer, setFormReducer } from './reducer';
import * as api from './api';
import { toast } from 'react-toastify';



export const createFormAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createForm(payload);

    dispatch(setFormReducer(data.data));
    if (data?.success === true) {
      
      toast.success('Form created successfully');
      
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) {}
};

export const updateFormDataAction = (id, payload) => async (dispatch) => {
  try {
    const d = { formData: payload };
    const { data } = await api.updateForm(id, d);

    dispatch(setFormReducer(data.data));
  } catch (error) {}
};

export const getFormDataAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getForm(id);

    dispatch(setFormReducer(data.data));
  } catch (error) {}
};

export const getFormsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getForms(id);

    dispatch(setAllFormsReducer(data.data));
  } catch (error) {}
};

export const deleteFormAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteForm(id);
    if (data?.success) {
      toast.success('Funnel deleted successfully');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) {}
};

export const addLeadAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.addLeads(id,payload);
    if (data?.success) {
      toast.success('Yay your registration complete');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) {}
};

export const addToImageLibraryAction = (payload) => async (dispatch)=>{
  try {
    const {data} = await api.addToImageLibrary(payload)
    if(data?.success){
      toast.success('Image uploaded successfully!');
    }
    else{
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) {
    
  }
}
