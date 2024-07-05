import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';
import lab42 from '../images/lab42.png';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);


function App() {
  const navigate = useNavigate();
  const divRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      divRef.current,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 3, ease: 'power3.out' }
    );
  }, []);

  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { text: '' },
      {
        text: 'Welcome to ThermalApp',
        duration: 2,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <div className='landing-page'>
      <div className='image-container'>
        <img src={lab42}></img>
      </div>
      <div  className='text-container'>
        <h2 ref={headerRef}>Welcome to ThermalApp</h2>
        <p ref={divRef}>Find the perfect spot in LAB42 with ThermalApp, designed for students to select rooms 
          based on temperature. Whether you need a <span className='cool-tone'>cool</span> study area 
          or a <span className='warm-tone'>warm</span> relaxation spot, 
          ThermalApp provides real-time temperature data to help you choose the ideal space.</p>
  <     button className='redirect-btn' onClick={() => navigate('/testing')}>
          Let's start
        </button>
      </div>
      
  </div>
  );
}

export default App;
