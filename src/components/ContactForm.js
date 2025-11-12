// components/ContactForm.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSubmitting, setError, updateFormData, clearForm } from '../store/formSlice';
import { submitForm } from '../utils/api';

const ContactForm = ({ isModal = false, onSuccess }) => {
  const { formData, isSubmitting, error } = useSelector(state => state.form);
  const dispatch = useDispatch();
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    // Загрузка из LocalStorage
    const savedData = localStorage.getItem('contactForm');
    if (savedData) {
      dispatch(updateFormData(JSON.parse(savedData)));
    }
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Имя обязательно';
    if (!formData.email.trim()) errors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Некорректный email';
    if (!formData.phone.trim()) errors.phone = 'Телефон обязателен';
    if (!formData.message.trim()) errors.message = 'Сообщение обязательно';

    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    dispatch(setSubmitting(true));
    dispatch(setError(null));

    try {
      // Сохранение в LocalStorage
      localStorage.setItem('contactForm', JSON.stringify(formData));
      
      await submitForm(formData);
      
      if (onSuccess) onSuccess();
      dispatch(clearForm());
      localStorage.removeItem('contactForm');
      
    } catch (err) {
      dispatch(setError('Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.'));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const handleChange = (field, value) => {
    dispatch(updateFormData({ [field]: value }));
  };

  return (
    <form className={`contact-form ${isModal ? 'contact-form--modal' : ''}`} onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={localErrors.name ? 'error' : ''}
        />
        {localErrors.name && <span className="error-text">{localErrors.name}</span>}
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="Ваш email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={localErrors.email ? 'error' : ''}
        />
        {localErrors.email && <span className="error-text">{localErrors.email}</span>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          placeholder="Ваш телефон"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={localErrors.phone ? 'error' : ''}
        />
        {localErrors.phone && <span className="error-text">{localErrors.phone}</span>}
      </div>

      <div className="form-group">
        <textarea
          placeholder="Ваше сообщение"
          rows="5"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={localErrors.message ? 'error' : ''}
        ></textarea>
        {localErrors.message && <span className="error-text">{localErrors.message}</span>}
      </div>

      {error && <div className="form-error">{error}</div>}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Отправка...
          </>
        ) : (
          'Отправить'
        )}
      </button>
    </form>
  );
};

export default ContactForm;
