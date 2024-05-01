import { Grid} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import '../styles/homepage.css'
import '../styles/custombutton.css'
import '../styles/roomselector.css'
import { gsap } from 'gsap';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function SpaceSelector() {

    // Selected floor and room storing
    const [floor, setFloor] = useState(0);  
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [isVisible, setisVisible] = useState(false);

    const roomsRefs = useRef([]);


    useEffect(() => {

        const fetchRooms = async () => {
            try {
                const response = await fetch(`/api/selection?floor=${floor}`);
                if (!response.ok) throw new Error('Failed to fetch rooms');
                const data = await response.json();
                setRooms(data);
                roomsRefs.current = roomsRefs.current.slice(0, data.length);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            }
        };

        fetchRooms();
    }, [floor]);

    useEffect(() => {
        if (roomsRefs.current.length > 0) {
            gsap.fromTo(roomsRefs.current, { opacity: 0, scale:0}, { opacity: 1, scale:1, stagger: 0.1, duration:0.5 });
        }
    }, [rooms]);

    const handleFloorMenu = (i) => {
        setFloor(i);
        setisVisible(false);
    }

    return (
        <div className='selectorContainer'>
        <ul className='floor-list-container'>
            <li className='trigger' onMouseEnter={() => setisVisible(true)}>
                <div className='selector-indication'>Select floor <ArrowDropDownIcon/></div>

            <ul className="floor-list" style={{visibility:isVisible ? 'visible' : 'hidden'}}>
            {Array.from({ length: 7 }, (_, i) => (
                        <li key={i} 
                            className='floor-item' 
                            onClick={() => 
                            handleFloorMenu(i)}>
                            Floor {i}
                        </li>
                    ))}
            </ul>
            </li>
            <li>
            {floor === 0 ? 'Ground Floor' : `${floor}${floor === 1 ? 'st' : (floor === 2 ? 'nd' : (floor === 3 ? 'rd' : 'th' ))} Floor`}
            </li>
        </ul>



        {error && <p>{error}</p>}
            <Grid container spacing={1}>  
               
                {rooms.map((room, index) => (

                    <Grid item xs={3} sm={4} lg={4} key={room.id}> 
                        <div className='buttonContainer'>
                            <a href="" ref={el => roomsRefs.current[index] = el} className='btn-flip' data-back={`${room.number}`} 
                                data-front={`${room.number}`} 
                                key={room.id} >
                                
                            </a>
                        </div>
                        
                    </Grid>

                ))}
            </Grid>
        </div>
    );
}

export default SpaceSelector;