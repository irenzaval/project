// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

// store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isModalOpen: false,
    isSubmitting: false,
    error: null,
    formData: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    clearForm: (state) => {
      state.formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
      state.error = null;
    }
  }
});

export const {
  openModal,
  closeModal,
  setSubmitting,
  setError,
  updateFormData,
  clearForm
} = formSlice.actions;

export default formSlice.reducer;
