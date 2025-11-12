// components/Header.js
import React, { useState } from 'react';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Your Logo</h1>
          </div>
          <Navigation />
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;
