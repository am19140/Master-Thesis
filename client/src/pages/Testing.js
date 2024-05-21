import React, { useState, useEffect, useRef } from 'react';
import Character from '../components/Character';
import { Grid, Paper } from '@mui/material';
import '../styles/homepage.css'
import FloorPlan from '../components/FloorPlan';
import SpaceSelector from '../components/RoomSelector';

function Testing() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    


    const fetchRooms = async () => {
        try{
            const response = await fetch('api/rooms');
            if(!response.ok) {                
                throw new Error('Failed to fetch because of' + response.statusText);                   
            }
            const data = await response.json();
            console.log(data); 
            setRooms(data);
        }
        catch(error) {
            setError(error.message);
            console.log(error);
        }
    };

    useEffect( () => {     
        fetchRooms();
    },[]);

    const handleRoomClick = (roomId) => {
        
        console.log(roomId);

        if (typeof roomId !== 'string') {
            console.error('Invalid roomId:', roomId);
            return;
        }

        let roomid = roomId;
        if(typeof roomid === 'string' || roomid instanceof String){
            if(roomid.includes("-")){
                roomid = roomId.split("-")[1];
            }
        }
        console.log(`Clicked on: ${roomid}`);
        if (roomid) {
            setSelectedRoomId(roomid);
            setCurrentIndex(1);
        }
    };

    

  
    const resetSelectedRoom = () => {
        setSelectedRoomId(null);
    };

  

    

    

    return (
      <div className="homepage">

        <>            
            <>
            <Grid container spacing={3}  className='gridBig'>
                <Grid item xs={12} sm={8}>
                    <FloorPlan onRoomClick={(e) => handleRoomClick(e.target.id)} />
                </Grid>

                <Grid item xs={12} sm={4} className='right-side'>    
                    <div className='rightContainer'>
                        <SpaceSelector 
                            selectedRoomId={selectedRoomId} 
                            resetSelectedRoom={resetSelectedRoom} 
                            handleRoomClick={handleRoomClick}
                            />                
                    </div>                
                </Grid>
            </Grid>


            
          

            </>
        </>
      </div>
    );
  }
  
  export default Testing;