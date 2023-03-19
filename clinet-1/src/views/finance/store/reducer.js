import { createSlice } from '@reduxjs/toolkit';

export const finance = createSlice({
  name: 'finance',
  initialState: {
    // Income
    isIncomeLoading: false,
    IncomeList: [],
    IncomeListSuccess: false,
    IncomeListFail: false,

    // Add Income
    incomeAddSuccess: false,
    incomeAddFail: false,
    resetAddIncomeStatus: false
  },

  reducers: {
    // fetching Income
    fetchIncome: (state, action) => {
      state.incomeList = action?.payload;
    },
    //addin Income
    addIncomeSuccess: (state, action) => {
      state.incomeAddSuccess = action?.payload;
    },
    addIncomeFail: (state, action) => {
      state.incomeAddFail = action?.payload;
    },
    resetAddIncomeStatus: (state, action) => {
      state.progressionAddSuccess = false;
      state.progressionAddFail = false;
    },
  }
});

export const {
  // Income
  fetchIncome,
  addIncomeFail,
  addIncomeSuccess,
  resetAddIncomeStatus
} = finance.actions;

export default finance.reducer;
