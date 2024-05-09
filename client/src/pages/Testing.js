import React, { useState, useEffect } from 'react';
import Character from '../components/Character';
import { Grid, Paper } from '@mui/material';
import '../styles/homepage.css'
import RoomSelector from '../components/RoomSelector';
import FloorPlan from '../components/FloorPlan';

function Testing() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);


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

    function ShowRoomsSensors(props){
        console.log(props.rooms);
        const rooms = props.rooms;
        return (
            <RoomSelector/>
        );
    }

    const cardContent = [
        {id:1, content: <Character 
            name='Content'
        /> },
        {id:2 , content: <Character 
            name='Content 2'
        />}
    ];

    function nextCard() {
        setCurrentIndex((previousIndex)=>(previousIndex+1) % cardContent.length);
    }

    function previousCard() {
        setCurrentIndex((previousIndex)=>(previousIndex-1) % cardContent.length);
    }

    const handleRoomClick = (event) => {
        console.log(`Clicked on: ${event.target.id}`);
        if(event.target.id!=''){
            setCurrentIndex(1);
        }
        
    };

    

    return (
      <div className="Homepage">
        <h1>Testing page</h1>

        <>            
            <>
            <Grid container spacing={3} style={{ padding: 24 }}>
                <Grid item xs={12} sm={6}>
                    <FloorPlan onRoomClick={handleRoomClick}/>
                </Grid>

                <Grid item xs={12} sm={6}>    
                    <div className='rightContainer'>
                        <ShowRoomsSensors rooms={rooms}/>                
                    </div>                
                </Grid>
            </Grid>


            <div className="card">
                <h2>{cardContent[currentIndex].content}</h2>
            </div>
            <button onClick={previousCard} disabled={currentIndex <= 0}>Back</button>
            <button onClick={nextCard} disabled={currentIndex >= cardContent.length - 1}>Next</button>
        

            </>
        </>
      </div>
    );
  }
  
  export default Testing;