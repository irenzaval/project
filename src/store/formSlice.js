// src/store/formSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронный action для отправки формы
export const submitFormData = createAsyncThunk(
  'form/submitFormData',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Замените на ваш ключ
          subject: 'Новая заявка с сайта',
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка сети');
      }

      const data = await response.json();
      
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || 'Ошибка при отправке формы');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loadFormDataFromStorage = () => {
  try {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Ошибка загрузки данных из localStorage:', error);
  }
  
  return {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
};

const formSlice = createSlice({
  name: 'form',
  initialState: {
    isModalOpen: false,
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    formData: loadFormDataFromStorage(),
    lastSubmission: null,
    animationState: 'closed' // 'opening', 'open', 'closing', 'closed'
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
      state.animationState = 'opening';
      state.submitError = null;
      state.submitSuccess = false;
    },
    closeModal: (state) => {
      state.animationState = 'closing';
      // Фактическое закрытие модалки произойдет после анимации
    },
    setModalClosed: (state) => {
      state.isModalOpen = false;
      state.animationState = 'closed';
    },
    setModalOpen: (state) => {
      state.animationState = 'open';
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      
      // Автосохранение в localStorage
      try {
        localStorage.setItem('contactFormData', JSON.stringify(state.formData));
      } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
      }
    },
    clearForm: (state) => {
      state.formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
      state.submitError = null;
      state.submitSuccess = false;
      
      try {
        localStorage.removeItem('contactFormData');
      } catch (error) {
        console.error('Ошибка очистки localStorage:', error);
      }
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
    },
    clearError: (state) => {
      state.submitError = null;
    },
    setLastSubmission: (state, action) => {
      state.lastSubmission = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormData.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
        state.submitSuccess = false;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        state.submitError = null;
        state.lastSubmission = new Date().toISOString();
        
        // Очищаем форму после успешной отправки
        state.formData = {
          name: '',
          email: '',
          phone: '',
          message: ''
        };
        
        try {
          localStorage.removeItem('contactFormData');
        } catch (error) {
          console.error('Ошибка очистки localStorage:', error);
        }
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload || 'Произошла ошибка при отправке формы';
        state.submitSuccess = false;
      });
  }
});

export const {
  openModal,
  closeModal,
  setModalClosed,
  setModalOpen,
  updateFormData,
  clearForm,
  setSubmitError,
  clearError,
  setLastSubmission
} = formSlice.actions;

export default formSlice.reducer;

// Селекторы
export const selectFormData = (state) => state.form.formData;
export const selectIsSubmitting = (state) => state.form.isSubmitting;
export const selectSubmitError = (state) => state.form.submitError;
export const selectSubmitSuccess = (state) => state.form.submitSuccess;
export const selectIsModalOpen = (state) => state.form.isModalOpen;
export const selectAnimationState = (state) => state.form.animationState;
