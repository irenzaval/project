// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Наши контакты</h3>
            <div className="footer-contacts">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>info@example.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>г. Москва, ул. Примерная, д. 123</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Быстрые ссылки</h3>
            <nav className="footer-nav">
              <a href="#services" className="footer-link">Услуги</a>
              <a href="#about" className="footer-link">О нас</a>
              <a href="#portfolio" className="footer-link">Портфолио</a>
              <a href="#contact" className="footer-link">Контакты</a>
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Мы в соцсетях</h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="VKontakte">
                <span className="social-icon">VK</span>
              </a>
              <a href="#" className="social-link" aria-label="Telegram">
                <span className="social-icon">TG</span>
              </a>
              <a href="#" className="social-link" aria-label="WhatsApp">
                <span className="social-icon">WA</span>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">IG</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Рабочее время</h3>
            <div className="working-hours">
              <div className="hours-item">
                <span>Пн-Пт:</span>
                <span>9:00 - 18:00</span>
              </div>
              <div className="hours-item">
                <span>Сб:</span>
                <span>10:00 - 16:00</span>
              </div>
              <div className="hours-item">
                <span>Вс:</span>
                <span>Выходной</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} Адаптивный веб-сайт. Все права защищены.
          </div>
          <div className="footer-links">
            <a href="#privacy" className="footer-bottom-link">
              Политика конфиденциальности
            </a>
            <a href="#terms" className="footer-bottom-link">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
