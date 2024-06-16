
import React, { useState, useEffect, useRef } from 'react';
import '../styles/homepage.css'
import '../styles/custombutton.css'
import '../styles/roomselector.css'
import { gsap } from 'gsap';
import { DownOutlined, CloseCircleOutlined, LikeOutlined,DislikeOutlined, LoadingOutlined} from '@ant-design/icons';
import backArrow from '../images/back-arrow.png';
import { Spin, Progress, Radio } from 'antd';
import {ReactComponent as Snowman} from '../images/snowman.svg'
import '../styles/snowman.css'
import CustomSlider from './CustomSlider';
import RadioButtons from './RadioButtons';


function SpaceSelector({ selectedRoomId, resetSelectedRoom, handleRoomClick, temperature, loading, floor, setFloor,progress }) {

    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    const [radioValue, setRadioValue] = useState('comfortable');
    const [isSnowmanVisible, setisSnowmanVisible] = useState(false);
    const roomsRefs = useRef([]);
    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const svgRef = useRef(null);
    const [opacityRef1, setOpacityRef1] = useState(1);
    const [opacityRef2, setOpacityRef2] = useState(0);
    const load = useRef(null);   

    

    const zIndexRef1 = opacityRef1 === 1 ? 10 : 5;
    const zIndexRef2 = opacityRef2 === 1 ? 10 : 5;
    
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
        if (svgRef.current) {
            console.log('svg exists');
            gsap.set(svgRef.current, { opacity: 0 });
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            
            if (selectedRoomId) {
                setOpacityRef1(1);
                setOpacityRef2(0); 
                gsap.to(contentRef1.current, { x: 0, opacity: 1, duration: 1 });
                gsap.to(contentRef2.current, { x: 0, opacity: 0, duration: 1 });
            } else {
                setOpacityRef1(0.5);
                setOpacityRef2(1); 
                gsap.to(contentRef1.current, { x: -50, opacity: 0, duration: 1 });
                gsap.to(contentRef2.current, { x: 0, opacity: 1, duration: 1 });
            }
        }
    }, [selectedRoomId, loading]);



    useEffect(()=>{
        if(loading){
            gsap.to(load.current, {x:0, opacity:1 ,duration:1});
            gsap.to(contentRef1.current, { x: 300, opacity: 0, duration: 1 });
            gsap.to(contentRef2.current, { x: 300, opacity: 0, duration: 1 });
        }
        
    })

  

    useEffect(() => {
        if (isSnowmanVisible && svgRef.current) {
            gsap.set(svgRef.current, { opacity: 0 });
            gsap.to(svgRef.current, { opacity: 1, duration: 1 });
        } else if (svgRef.current && !isSnowmanVisible) {
            
            gsap.to(svgRef.current, { opacity: 0, duration: 1 });
        }
    }, [isSnowmanVisible]);

    

    

    const handleFloorMenu = (i) => {
        setFloor(i);
        setisVisible(false);
    }

    const handleSubmitClick = (event) => {
        event.stopPropagation();
        setisSnowmanVisible(true);       
        
    };

    const handleCloseAvatar = (event) => {
        event.stopPropagation();
        setisSnowmanVisible(false);       
        
    };

    const handleRadioChange = e => {
        setRadioValue(e.target.value);
    };
   
    

    return (
        <div className='selectorContainer'>
  
        {error && <p>{error}</p>}
        {isSnowmanVisible && 

            <div className='svgContainer'>
                
                <div onClick={handleCloseAvatar} className='back-arrow' >                            
                    <CloseCircleOutlined className='circleClose'/>
                </div>
                <Snowman  ref={svgRef}  className='svgFloating'/>
            </div>
        }
        
        {loading && <div ref={load} className='spinner'> <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color:"#fff" }} spin />}/> </div>  }
        
        <div ref={contentRef1} style={{position: 'absolute',zIndex: zIndexRef1, opacity: opacityRef1 }} className='contentRef1'>
            <a onClick={resetSelectedRoom} className='back-arrow'href="">                            
                <img src={backArrow} alt="Back" />
            </a>
            <div className='title'>Room {selectedRoomId}'s Conditions</div>
            <div className='conditions-component'>
                <div className='thermal-conditions'>
                    {/* Temperature display */}
                   <h1>{temperature !== null ? <div>{temperature}°</div> : <div>No temperature data</div>}</h1> 
                    {/* Subjective data */}
                   <p>Most students perceive this room as cold</p>
                </div>
                {/* Perfect for? */}
                <div className='badge'>
                    <Snowman/>
                </div>
            </div>

            <div className='feedback-component'>
                <h3>Do you have any complaints about your room?</h3>
                
                <div className='question first'>
                <RadioButtons value={radioValue} onChange={handleRadioChange}/>
                </div> 
                <div className='question second'>
                <CustomSlider className='custom-slider' min={0} max={6} />
                </div>
                <div className='question third'>

                </div>                    
                <a onClick={handleSubmitClick} href='#' className='submitBtn'>Submit</a>
            </div>
            
            
        </div>
            
            <div className='contentRef2' ref={contentRef2} style={{position: 'absolute',zIndex: zIndexRef2, opacity: opacityRef2 }}>
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
                            <a ref={el => roomsRefs.current[index] = el} 
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