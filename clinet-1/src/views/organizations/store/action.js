import { setOrgs } from './reducer';

import * as api from './api';
import { toast } from 'react-toastify';

export const getOrgsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getOrgs();
    if (data) {
      dispatch(setOrgs(data));
    }
  } catch (error) {}
};

export const getOrgByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getOrg(id);
    return data;
  } catch (error) {}
};

export const addNewOrgAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addOrg(payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('Organization added successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const updateOrgAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateOrg(id, payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('Organization updated successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const addNewOrgLocationAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.addLocation(id,payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('New Location Added Successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

