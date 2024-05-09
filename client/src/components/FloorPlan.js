import { Grid} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as FloorPlan0 } from '../floors/floor0.svg';


function FloorPlan({onRoomClick}){
 
    // const handleRoomClick = (e) => {

    //     console.log(`Clicked on: ${e.target.id}`); 
    //     e.target.style.fill = 'red'; 
    //   };
    
      return (
        <div>
          <FloorPlan0 onClick={onRoomClick} style={{ width: '100%', height: 'auto' }}/>
        </div>
      );
}


export default FloorPlan;