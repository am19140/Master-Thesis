import React, { useState, useEffect } from 'react';

function Testing() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);

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
            <>
                {rooms.map((room) => (
                    <div key={room.id}>
                        {room.floor}, {room.number}
                    </div>           
                ))}
            </>
        );
    }

    return (
      <div className="Homepage">
        <h1>Testing page</h1>
        <>            
            <ShowRoomsSensors rooms={rooms}/>
        </>
      </div>
    );
  }
  
  export default Testing;