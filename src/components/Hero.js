// components/Hero.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/formSlice';

const Hero = () => {
  const dispatch = useDispatch();

  return (
    <section className="hero">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="hero-video"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay">
        <div className="container">
          <div className="hero-content">
            <h1>Добро пожаловать</h1>
            <p>Мы создаем современные цифровые решения</p>
            <button 
              className="cta-button"
              onClick={() => dispatch(openModal())}
            >
              Связь с нами
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
