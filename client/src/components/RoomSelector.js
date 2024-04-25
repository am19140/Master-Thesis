import { Button } from '@mui/material';
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
        
            <select value={floor} onChange={e => setFloor(e.target.value)}>
                <option value="">Select a Floor</option>
                {Array.from({ length: 7 }, (_, i) => (
                    <option key={i} value={i}>Floor {i}</option>
                ))}
            </select>

        {error && <p>Error: {error}</p>}
            <ul>
                {rooms.map(room => (
                    <button key={room.id} className='roomButton' >
                        Room {room.number}
                    </button>
                ))}
            </ul>
        </div>
    );
}

export default SpaceSelector;