import * as api from './api';
import {
  fetchIncome,
  addIncomeFail,
  addIncomeSuccess,
  resetAddIncomeStatus,
} from './reducer';

//parent Income
export const IncomeFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchIncome();
    console.log(data)
    dispatch(fetchIncome(data?.data));
  } catch (error) {}
};

export const IncomeAddAction = (IncomeData) => async (dispatch) => {
  try {
    const { data } = await api.addIncome(IncomeData);
    if (data.success === true) {
      dispatch(addIncomeSuccess(true));
    } 
    else {
      dispatch(addIncomeFail(true));
    }
    dispatch(resetAddIncomeStatus());
    dispatch(IncomeFetchAction());
  } catch (error) {}
};