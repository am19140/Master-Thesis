import { Grid} from '@mui/material';
import React, { useState, useEffect } from 'react';
import '../styles/homepage.css'
import '../styles/custombutton.css'
import { gsap } from 'gsap';


function SpaceSelector() {

    // Selected floor and room storing
    const [floor, setFloor] = useState(0);  
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const roomsRefs = useRef([]);


    useEffect(() => {

        const fetchRooms = async () => {
            try {
                const response = await fetch(`/api/selection?floor=${floor}`);
                if (!response.ok) throw new Error('Failed to fetch rooms');
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            }
        };

        fetchRooms();
    }, [floor]);

    return (
        <div className='selectorContainer'>
        
            <select value={floor} onChange={e => setFloor(e.target.value)} className='dropDownMenu'>
                <option value="">Select a Floor</option>
                {Array.from({ length: 7 }, (_, i) => (
                    <option key={i} value={i}>Floor {i}</option>
                ))}
            </select>

        {error && <p>Error: {error}</p>}
            <Grid container spacing={2}>  
                {rooms.map(room => (
                    <Grid item xs={3} sm={4} lg={6} key={room.id}> 
                        <a href="#" className='btn-flip' data-back={`Room ${room.number}`} data-front={`Room ${room.number}`}>
                           
                        </a>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default SpaceSelector;