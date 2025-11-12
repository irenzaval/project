// components/Navigation.js
import React, { useState } from 'react';

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li 
          onMouseEnter={() => setActiveDropdown('services')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <a href="#services">Услуги</a>
          {activeDropdown === 'services' && (
            <ul className="dropdown">
              <li><a href="#web">Веб-разработка</a></li>
              <li><a href="#mobile">Мобильные приложения</a></li>
              <li><a href="#design">Дизайн</a></li>
            </ul>
          )}
        </li>
        <li><a href="#about">О нас</a></li>
        <li><a href="#portfolio">Портфолио</a></li>
        <li><a href="#contact">Контакты</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
