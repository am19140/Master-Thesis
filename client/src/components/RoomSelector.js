import { Grid} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import '../styles/homepage.css'
import '../styles/custombutton.css'
import '../styles/roomselector.css'
import { gsap } from 'gsap';
import { DownOutlined } from '@ant-design/icons';
import backArrow from '../images/back-arrow.png';


function SpaceSelector({ selectedRoomId, resetSelectedRoom, handleRoomClick }) {

    
    const [floor, setFloor] = useState(0);  
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    const roomsRefs = useRef([]);
    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);

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

    useEffect(()=>{
        if(selectedRoomId){
            gsap.to(contentRef1.current, {x:0, opacity:1 ,duration:1});
            gsap.to(contentRef2.current,{x:100, opacity:0 ,duration:1});
        }
        else{
            gsap.to(contentRef1.current, {x:-200,opacity:0, duration:1});
            gsap.to(contentRef2.current, {x:0,opacity:1, duration:1});

        }
    },[selectedRoomId,contentRef1,contentRef2]);

    const handleFloorMenu = (i) => {
        setFloor(i);
        setisVisible(false);
    }

    return (
        <div className='selectorContainer'>
  
        {error && <p>{error}</p>}


        
                <div ref={contentRef1} style={{position: 'absolute'}} className='contentRef1'>
                    <a onClick={resetSelectedRoom}>                            
                        <img src={backArrow} alt="Back" />
                    </a>
                    <h2>Selected Room: {selectedRoomId}</h2>
                </div>
            
                <div ref={contentRef2} style={{position: 'absolute'}}>
                    <ul className='floor-list-container'>
                    <li className='trigger' onMouseEnter={() => setisVisible(true)}>
                        <div className='selector-indication'>Select floor <DownOutlined /> </div>
        
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
                <Grid container spacing={1}>
                    {rooms.map((room, index) => (
                        <Grid item xs={3} sm={4} lg={4} key={room.id}>
                            <div className='buttonContainer'>
                                <a href="#" ref={el => roomsRefs.current[index] = el} 
                                className='btn-flip' 
                                data-back={`${room.number}`} 
                                data-front={`${room.number}`} 
                                key={room.id}
                                onClick={(e)=>  
                                        {e.preventDefault();    
                                        handleRoomClick(room.number)}
                                    }></a>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                </div>
            
        </div>
    );
}

export default SpaceSelector;