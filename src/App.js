import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import Hero from './components/Hero';
import Slider from './components/Slider';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Hero />
          <main>
            <section id="about">
              <div className="container">
                <h2>О нас</h2>
                <p>Текст о компании...</p>
              </div>
            </section>
            
            <section id="services">
              <div className="container">
                <h2>Наши услуги</h2>
                <Slider />
              </div>
            </section>
            
            <section id="contact">
              <div className="container">
                <h2>Свяжитесь с нами</h2>
                <ContactForm />
              </div>
            </section>
          </main>
          <Footer />
          <ContactModal />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
