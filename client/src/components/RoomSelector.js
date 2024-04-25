import { Grid} from '@mui/material';
import React, { useState, useEffect } from 'react';
import '../styles/homepage.css'
import '../styles/custombutton.css'

function SpaceSelector() {

    // Selected floor and room storing
    const [floor, setFloor] = useState(0);  
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);

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
        <div>
        
            <select value={floor} onChange={e => setFloor(e.target.value)} className='dropDownMenu'>
                <option value="">Select a Floor</option>
                {Array.from({ length: 7 }, (_, i) => (
                    <option key={i} value={i}>Floor {i}</option>
                ))}
            </select>

        {error && <p>Error: {error}</p>}
            <Grid container spacing={2}>  
                {rooms.map(room => (
                    <Grid item xs={12} xm={3} md={4}  key={room.id}> 
                        <a href="#" className='btn-flip' data-back={`Select Space ${room.number}`} data-front={`Room ${room.number}`}>
                           
                        </a>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default SpaceSelector;