
// components/ContactModal.js
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/formSlice';
import ContactForm from './ContactForm';
import { useAnimation } from '../hooks/useAnimation';

const ContactModal = () => {
  const { isModalOpen } = useSelector(state => state.form);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { animate } = useAnimation();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      animate(300, (progress) => {
        if (modalRef.current) {
          modalRef.current.style.opacity = progress;
          modalRef.current.style.transform = `scale(${0.8 + progress * 0.2})`;
        }
      });
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, animate]);

  const handleClose = () => {
    animate(200, (progress) => {
      if (modalRef.current) {
        modalRef.current.style.opacity = 1 - progress;
        modalRef.current.style.transform = `scale(${1 - progress * 0.2})`;
      }
    });
    setTimeout(() => dispatch(closeModal()), 200);
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>
        <h2>Свяжитесь с нами</h2>
        <ContactForm isModal={true} onSuccess={handleClose} />
      </div>
    </div>
  );
};

export default ContactModal;
