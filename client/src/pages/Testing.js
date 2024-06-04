import React, { useState, useEffect, useRef } from 'react';
import Character from '../components/Character';
import { Grid, Paper } from '@mui/material';
import '../styles/homepage.css'
import FloorPlan from '../components/FloorPlan';


import SpaceSelector from '../components/RoomSelector';

function Testing() {
    
    const [floor, setFloor] = useState(0);  
    const [temperature, setTemperature] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedRoomId, setSelectedRoomId] = useState(null); 


    useEffect(() => {
        if (loading && selectedRoomId) {
          const eventSource = new EventSource(`/api/room_temp/${selectedRoomId}`);
    
          eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.percent !== undefined) {
              setProgress(data.percent);
            }
            if (data.temperature !== undefined) {
              setTemperature(data.temperature);
              setLoading(false);
              eventSource.close();
            }
          };
    
          eventSource.onerror = (err) => {
            console.error('Error with SSE', err);
            setLoading(false);
            eventSource.close();
          };
    
          return () => {
            eventSource.close();
          };
        }
      }, [loading, selectedRoomId]);


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
        

        const cacheKey = `room_temp_${roomId}`;
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const now = new Date();
            
            // Assume data is valid for 10 minutes
            if (new Date(parsedData.timestamp).getTime() + 600000 > now.getTime()) {
                setTemperature(parsedData.temperature);
                setSelectedRoomId(room_number);
                return;
            }
        }

        
        setLoading(true);    
        fetch(`/api/room_temp/${roomId}`)
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch temperature data');
                setProgress(70);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setProgress(90);
                console.log(progress);
                setTemperature(data);
                localStorage.setItem(cacheKey, JSON.stringify({
                    temperature: data,
                    timestamp: new Date().toISOString()
                }));
            })
            .catch((err) => {
                console.error('Error fetching temperature data:', err);
            })
            .finally(() => {
                setLoading(false);
                setSelectedRoomId(room_number);
            });
        
    };

    const resetSelectedRoom = () => {
        setSelectedRoomId(null);
    };

    

    return (
      <div className="homepage">

                
            <>
            <Grid container spacing={3}  className='gridBig'>
                <Grid item xs={12} sm={8} className='left-side'>
                    <FloorPlan onRoomClick={(e) => handleRoomClick(e.target.getAttribute('data-no'), e.target.id)} floor={floor}/>
                </Grid>

                <Grid item xs={12} sm={4} className='right-side'>    
                    <div className='rightContainer'>
                        <SpaceSelector 
                            selectedRoomId={selectedRoomId} 
                            resetSelectedRoom={resetSelectedRoom} 
                            handleRoomClick={handleRoomClick}
                            temperature={temperature}
                            loading={loading}
                            floor={floor}
                            setFloor={setFloor}
                            
                            />                
                    </div>                
                </Grid>
            </Grid>


            
          

            </>
   
      </div>
    );
  }
  
  export default Testing;