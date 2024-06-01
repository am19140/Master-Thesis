import { Grid} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as FloorPlan0 } from '../floors/floor0.svg';
import { ReactComponent as FloorPlan1 } from '../floors/floor1.svg';
import '../styles/svg.css'
import gsap from 'gsap';



function FloorPlan({onRoomClick, floor}){

  console.log('Selected:',floor);
 
  const floorRef = useRef();  
  const floorPlans = [<FloorPlan0 />, <FloorPlan1 />];
  useEffect(() => {
    // Trigger a fade-out/fade-in animation on floor change
    if (floorRef.current) {
        gsap.to(floorRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.out',
            onComplete: () => {
                gsap.to(floorRef.current, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power1.in'
                });
            }
        });
    }
  }, [floor]); 

    
      return (
        <div ref={floorRef} onClick={onRoomClick} style={{ width: '100%', height: 'auto' }}>
          {floorPlans[floor]}
        </div>
       
      );
}


export default FloorPlan;