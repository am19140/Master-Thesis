import logo from './logo.svg';
import './App.css';
import React from 'react';
import Testing from './pages/Testing';
import { AppBar, Typography, Button, Toolbar } from '@mui/material';

function App() {


  return (
    <>
    {/* <AppBar position="static">
      <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
              
          </Typography>
          <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar> */}
    <Testing/>
    </>
    
    
  );
}

export default App;
