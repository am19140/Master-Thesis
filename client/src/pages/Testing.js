import React, { useState, useEffect, useRef } from 'react';
import Character from '../components/Character';
import { Grid, Paper } from '@mui/material';
import '../styles/homepage.css'
import FloorPlan from '../components/FloorPlan';
import SpaceSelector from '../components/RoomSelector';

function Testing() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [temperature, setTemperature] = useState(false);
    const [loading, setLoading] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    
   


    const handleRoomClick =  async (roomNumber, roomId) => {
        
        console.log(`Clicked on room with id: ${roomId}`);
        console.log(`Clicked on room with no: ${roomNumber}`);

        if (typeof roomNumber !== 'string') {
            console.error('Invalid roomNumber:', roomNumber);
            return;
        }

        let room_number = roomNumber;
        if(typeof room_number === 'string' || room_number instanceof String){
            if(room_number.includes("-")){
                room_number = roomNumber.split("-")[1];
            }
        }
        console.log(`Clicked on: ${room_number}`);

        if (room_number) {
            setLoading(true);
            fetch(`/api/room_temp/${roomId}`)
                .then((response) => {
                    if (!response.ok) throw new Error('Failed to fetch temperature data');
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setTemperature(data);
                })
                .catch((err) => {
                    console.error('Error fetching temperature data:', err);
                })
                .finally(() => {
                    setLoading(false);
                    setSelectedRoomId(room_number);
                });
        }
    };

    

    
  
    const resetSelectedRoom = () => {
        setSelectedRoomId(null);
    };

    return (
      <div className="homepage">

                
            <>
            <Grid container spacing={3}  className='gridBig'>
                <Grid item xs={12} sm={8}>
                    <FloorPlan onRoomClick={(e) => handleRoomClick(e.target.getAttribute('data-no'), e.target.id)} />
                </Grid>

                <Grid item xs={12} sm={4} className='right-side'>    
                    <div className='rightContainer'>
                        <SpaceSelector 
                            selectedRoomId={selectedRoomId} 
                            resetSelectedRoom={resetSelectedRoom} 
                            handleRoomClick={handleRoomClick}
                            temperature={temperature}
                            loading={loading}
                            />                
                    </div>                
                </Grid>
            </Grid>


            
          

            </>
   
      </div>
    );
  }
  
  export default Testing;