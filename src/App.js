import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  useEffect(() => {
    // Add smooth scroll behavior
    const handleSmoothScroll = (e) => {
      if (e.target.hash && e.target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(e.target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Suruthi E. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/suruthieswar" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/suruthi-eswaramoorthi-9426b631b" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://leetcode.com/u/suruthieswar/" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-code"></i>
            </a>
            <a href="mailto:suruthieswaramoorthi@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;