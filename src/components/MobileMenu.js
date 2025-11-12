// components/MobileMenu.js
import React, { useEffect } from 'react';

const MobileMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}>
      <div className="mobile-menu-content">
        <button className="mobile-menu-close" onClick={onClose}>
          ×
        </button>
        <nav className="mobile-nav">
          <ul>
            <li><a href="#services" onClick={onClose}>Услуги</a></li>
            <li><a href="#about" onClick={onClose}>О нас</a></li>
            <li><a href="#portfolio" onClick={onClose}>Портфолио</a></li>
            <li><a href="#contact" onClick={onClose}>Контакты</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
