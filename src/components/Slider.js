// src/components/Slider.js
import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Веб-разработка",
      description: "Создаем современные и адаптивные веб-приложения",
      image: "/images/web-dev.jpg",
      color: "#3498db"
    },
    {
      id: 2,
      title: "Мобильные приложения",
      description: "Разработка нативных и кроссплатформенных приложений",
      image: "/images/mobile-app.jpg",
      color: "#e74c3c"
    },
    {
      id: 3,
      title: "UI/UX Дизайн",
      description: "Создаем интуитивные и красивые интерфейсы",
      image: "/images/ui-ux.jpg",
      color: "#9b59b6"
    },
    {
      id: 4,
      title: "Техническая поддержка",
      description: "Полное сопровождение и развитие ваших проектов",
      image: "/images/support.jpg",
      color: "#2ecc71"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="slider"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              background: `linear-gradient(135deg, ${slide.color}44, ${slide.color}22)`,
              borderLeft: `4px solid ${slide.color}`
            }}
          >
            <div className="slide-content">
              <div className="slide-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="slide-title">{slide.title}</h3>
              <p className="slide-description">{slide.description}</p>
              <button 
                className="slide-button"
                style={{ backgroundColor: slide.color }}
              >
                Узнать больше
              </button>
            </div>
            <div className="slide-image">
              <div 
                className="image-placeholder"
                style={{ backgroundColor: slide.color }}
              >
                {slide.title.charAt(0)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button className="slider-btn slider-btn-prev" onClick={prevSlide}>
          ‹
        </button>
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        
        <button className="slider-btn slider-btn-next" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="slider-progress">
        <div 
          className="slider-progress-bar"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
            backgroundColor: slides[currentSlide]?.color
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
