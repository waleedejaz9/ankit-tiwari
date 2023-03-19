import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addIncome = (incomeData) => {
  return API.post('expense', incomeData, { "Content-Type": "multipart/form-data" });
};

export const fetchIncome = () => {
  return API.get('expense');
};