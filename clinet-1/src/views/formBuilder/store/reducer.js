import { createSlice } from '@reduxjs/toolkit';

//form data
export const formEditor = createSlice({
  name: 'formEditor',
  initialState: {
    form: {
      _id: '',
      name: '',
      memberType: '',
      smartList: '',
      subCategory: '',
      formType: 'optin',
      formData: [{ id:'',step: '1', name:'', css:'',html:'', path:'' , show:true }], 
      automateEntry: false,
      status: '',
      templateId: '1'
    },
    funnels: [],
    favorits: [],
    templates: []
  },
  reducers: {
    setFormReducer: (state, action) => {
      state.form = action?.payload;
    },
    // setFormAndDataReducer: (state, action) => {
    //   state.formData = action?.payload?.formData;
    //   state.form = {
    //     _id: action?.payload?._id,
    //     name: action?.payload?.name,
    //     memberType: action?.payload?.memberType,
    //     smartList: action?.payload?.smartList,
    //     subCategory: action?.payload?.subCategory,
    //     formType: action?.payload?.formType,
    //     automateEntry: action?.payload?.automateEntry
    //   };
    // },
    setToDefaultReducer: (state, action) => {
      state.form = {
        _id: '',
        name: '',
        memberType: '',
        smartList: '',
        subCategory: '',
        formType: 'optin',
        formData: [],
        automateEntry: false
      };
    },

    setAllFormsReducer: (state, action) => {
      state.funnels = action?.payload;
    },
    setFavoritesReducer: (state, action) => {
      state.favorits = action?.payload;
    },
    setTemplatesReducer: (state, action) => {
      state.templates = action?.payload;
    }
  }
});

export const {
  setFormReducer,
  setToDefaultReducer,
  setAllFormsReducer,
  setFavoritesReducer,
  setTemplatesReducer
} = formEditor.actions;
export default formEditor.reducer;
