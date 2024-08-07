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
    const [selectedRoomNumber, setSelectedRoomNumber] = useState(null); 
    const [cacheKey, setCacheKey] = useState(null); 
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [roomClicked, setRoomClicked] = useState(false);
    const [scenario1, setScenario1] = useState(false);
    const [scenario2, setScenario2] = useState(false); 
    const interactive = scenario1 || scenario2;

    useEffect(() => {
        if (loading && selectedRoomId) {
          const eventSource = new EventSource(`/api/room_temp/${selectedRoomId}`);
    
          eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.temperature !== undefined) {
              setTemperature(data.temperature);
              setLoading(false);
              eventSource.close();
            }
          };
    
          eventSource.onerror = (err) => {
            setLoading(false);
            eventSource.close();
          };
    
          return () => {
            eventSource.close();
          };
        }
      }, [loading, selectedRoomId]);

      useEffect(() => {
        if (!scenario1 && !scenario2) {
        }
      }, [scenario1,scenario2]);


    const handleRoomClick =  async (roomNumber, roomId) => {
        
      
      setFeedbackSubmitted(false);
      setCacheKey(`room_temp_${roomId}`);

        if (typeof roomNumber !== 'string') {
            return;
        }
       
        let room_number = roomNumber;
        if(typeof room_number === 'string' || room_number instanceof String){
            if(room_number.includes("-")){
                room_number = roomNumber.split("-")[1];
            }
        }

        setSelectedRoomNumber(room_number);
        setRoomClicked(prev => !prev);

        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const now = new Date();
            
            // Assume data is valid for 10 minutes
            if (new Date(parsedData.timestamp).getTime() + 600000 > now.getTime()) {
                setTemperature(parsedData.temperature);
                setSelectedRoomId(roomId);
                return;
            }
        }

        
        setLoading(true);  
        
        
        fetch(`/api/room_temp/${roomId}`)
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch temperature data');
                return response.json();
            })
            .then((data) => {
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
                setSelectedRoomId(roomId);
            });
        
    };

    const resetSelectedRoom = () => {
        setSelectedRoomId(null);
    };


    
    

    return (
      <div className="homepage">

                
            <>
            <Grid container spacing={3}  className='gridBig'>
                <Grid item xs={12} sm={8} >
                    <div className='left-side'>
                      <FloorPlan onRoomClick={(e) => 
                        handleRoomClick(e.target.getAttribute('data-no'), e.target.id)} 
                        floor={floor}
                        interactive ={interactive}
                        />
                        <div className='legend'>
                          <div className='legend-element'>
                            <div className='colored-box tirquoise'></div>
                            <div className='explanation'>Rooms equipped with temperature sensors</div>
                          </div>
                          <div className='legend-element'>
                            <div className='colored-box blue'></div>
                            <div className='explanation'>Selected room</div>
                          </div>
                        </div>
                    </div>
                    
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
                            selectedRoomNumber = {selectedRoomNumber}
                            setFeedbackSubmitted={setFeedbackSubmitted}
                            feedbackSubmitted={feedbackSubmitted}
                            scenario1={scenario1}
                            setScenario1={setScenario1}
                            scenario2={scenario2}
                            setScenario2={setScenario2}
                            />                
                    </div>                
                </Grid>
            </Grid>


            
          

            </>
   
      </div>
    );
  }
  
  export default Testing;