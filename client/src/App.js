import logo from './logo.svg';
import './App.css';
import React from 'react';
import Testing from './pages/Testing';
import { AppBar, Typography, Button, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';


function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </Router>
    </>
    
    
  );
}

export default App;
