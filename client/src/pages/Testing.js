import React, { useState, useEffect } from 'react';
import Character from '../components/Character';
import { Grid, Paper } from '@mui/material';
import '../styles/homepage.css'
import RoomSelector from '../components/RoomSelector';

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


    

    return (
      <div className="Homepage">
        <h1>Testing page</h1>

        <>            
            <>
            <Grid container spacing={3} style={{ padding: 24 }}>
                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: 16 }}>
                        
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: 16 }}>
                        <ShowRoomsSensors rooms={rooms}/>
                    </Paper>
                </Grid>
            </Grid>


            <div className="card">
                <h2>{cardContent[currentIndex].content}</h2>
            </div>
            {currentIndex > 0 && (
                <button onClick={previousCard}>Back</button>
            )}
            {currentIndex < cardContent.length - 1 && (
                <button onClick={nextCard}>Next</button>
            )}

            </>
        </>
      </div>
    );
  }
  
  export default Testing;