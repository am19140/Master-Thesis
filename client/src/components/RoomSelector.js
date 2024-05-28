
import React, { useState, useEffect, useRef } from 'react';
import '../styles/homepage.css'
import '../styles/custombutton.css'
import '../styles/roomselector.css'
import { gsap } from 'gsap';
import { DownOutlined } from '@ant-design/icons';
import backArrow from '../images/back-arrow.png';
import { Spin } from 'antd';
import FallbackData from '../data/MOCK_DATA.json' ;


function SpaceSelector({ selectedRoomId, resetSelectedRoom, handleRoomClick, temperature, loading }) {

    
    const [floor, setFloor] = useState(0);  
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    const roomsRefs = useRef([]);
    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const load = useRef(null);


  
    useEffect(() => {

        const fetchRooms = async () => {
           
            try {
                const response = await fetch(`/api/selection?floor=${floor}`);
                if (!response.ok) throw new Error('Failed to fetch rooms');
                const data = await response.json();
                console.log(data);
                setRooms(data);
                
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            }
            
        };

        fetchRooms();
    }, [floor]);

    // useEffect(() => {
    //     const fetchTemperature = (roomId) => {
    
    //     for (const floor in FallbackData.floors) {
    //         if (FallbackData.floors[floor].rooms[roomId]) {
    //         return FallbackData.floors[floor].rooms[roomId].temperature;
    //         }
    //     }
    //     return 'Room not found'; 
    //     };

    //     if (selectedRoomId) {
    //     const temp = fetchTemperature(selectedRoomId);
    //     setTemperature(temp);
    //     }
    // }, [selectedRoomId]);

    useEffect(() => {
        if (roomsRefs.current.length > 0) {
            gsap.fromTo(roomsRefs.current, { opacity: 0, scale:0}, { opacity: 1, scale:1, stagger: 0.1, duration:0.1 });
        }
    }, [rooms]);

    useEffect(() => {
        if (!loading) {
            if (selectedRoomId) {
                gsap.to(contentRef1.current, { x: 0, opacity: 1, duration: 1 });
                gsap.to(contentRef2.current, { x: 100, opacity: 0, duration: 1 });
            } else {
                gsap.to(contentRef1.current, { x: -200, opacity: 0, duration: 1 });
                gsap.to(contentRef2.current, { x: 0, opacity: 1, duration: 1 });
            }
        }
    }, [selectedRoomId, loading]);



    useEffect(()=>{
        if(loading){
            gsap.to(load.current, {x:0, opacity:1 ,duration:1});
            gsap.to(contentRef1.current, { x: 100, opacity: 0, duration: 1 });
            gsap.to(contentRef2.current, { x: 100, opacity: 0, duration: 1 });
        }
        
    })

    const handleFloorMenu = (i) => {
        setFloor(i);
        setisVisible(false);
    }

 

    return (
        <div className='selectorContainer'>
  
        {error && <p>{error}</p>}

        {loading && <p ref={load} className='spinner'> <Spin size='large'/> </p>  }
        
        <div ref={contentRef1} style={{position: 'absolute'}} className='contentRef1'>
            <a onClick={resetSelectedRoom} className='back-arrow'>                            
                <img src={backArrow} alt="Back" />
            </a>
            <div className='title'>Room {selectedRoomId}'s Conditions</div>
            <div className='conditions-component'>
                <div className='thermal-conditions'>
                   <h1>{temperature}°</h1> 
                   <p>Most students perceive this room as cold</p>
                </div>
                <div className='badge'>
                    <img src={backArrow}></img>
                </div>
            </div>
            
            
        </div>
            
            <div className='contentRef2' ref={contentRef2} style={{position: 'absolute'}}>
                <ul className='floor-list-container'>
                    <li className='trigger' onMouseEnter={() => setisVisible(true)}>
                        <div className='selector-indication'>Select floor <DownOutlined /> </div>


                    <ul className="floor-list" style={{visibility:isVisible ? 'visible' : 'hidden'}}>
                    {Array.from({ length: 3 }, (_, i) => (
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
                <div className='buttonContainer'>
                    {rooms.map((room, index) => (                        
                        <div className='btn' key ={room.id}>
                            <a href="#" ref={el => roomsRefs.current[index] = el} 
                            className='btn-flip' 
                            
                           
                            onClick={(e)=>  
                                    {e.preventDefault();    
                                    handleRoomClick(room.number, room.id)}
                                }>
                                    {room.number}</a>
                        </div>
                        
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default SpaceSelector;