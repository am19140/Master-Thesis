
import React, { useState, useEffect, useRef } from 'react';
import '../styles/homepage.css'
import '../styles/custombutton.css'
import '../styles/roomselector.css'
import { gsap } from 'gsap';
import { DownOutlined, CloseCircleOutlined, LikeOutlined,DislikeOutlined, LoadingOutlined} from '@ant-design/icons';
import backArrow from '../images/back-arrow.png';
import { Spin} from 'antd';
import {ReactComponent as Snowman} from '../images/snowman.svg'
import '../styles/snowman.css'
import CustomSlider from './CustomSlider';
import RadioButtons from './RadioButtons';
import happyPeople from '../images/celebration.png';
import fire from '../images/fire.png';
import snowman_cool from '../images/snowman_cool.png';
import slightly_warm from '../images/slightly-warm.png';
import slightly_cool from '../images/slightly-cool.png';
import hot from '../images/hot.png';
import cold from '../images/cold.png';
import Joyride from 'react-joyride';


function SpaceSelector({ selectedRoomId, resetSelectedRoom, handleRoomClick, temperature, loading, floor, setFloor,selectedRoomNumber, setFeedbackSubmitted, feedbackSubmitted }) {

    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    const [radioValue, setRadioValue] = useState('comfortable');
    const [sliderValue, setSliderValue] = useState(0); 
    const [isSnowmanVisible, setisSnowmanVisible] = useState(false);
    const roomsRefs = useRef([]);
    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const svgRef = useRef(null);
    const [opacityRef0, setOpacityRef0] = useState(1);

    const [opacityRef1, setOpacityRef1] = useState(0);
    const [opacityRef2, setOpacityRef2] = useState(0);
    const load = useRef(null); 
    const [userFeedback, setUserFeedback] = useState('');
    const [runInitial, setRunInitial] = useState(true); // To control the initial walkthrough
    const [runSecond, setRunSecond] = useState(false); // To control the contentRef1 walkthrough
    
 
    
    const [roomFeedback, setRoomFeedback] = useState({
        perceptions: [],
        mostCommonPerceptions: [],  
        isControversial: false,
        badgeContent:[],
        message: ""
    });

    const perceptionImages = {
        comfortable: happyPeople,
        hot: hot,
        cold: cold,
        'slightly warm': slightly_warm,
        warm: fire,
        'slightly cool': slightly_cool,
        cool: snowman_cool
    };

    
    const initialSteps = [
        {
            target: '.trigger',
            content: 'Click here to select a floor.',
        },
        {
            target: '.buttonContainer',
            content: 'Check the list for room numbers equipped with temperature sensors..',
        },
        {
            target: '.btn-flip',
            content: 'Click on a room to view its thermal conditions.',
        },

        {
            target: '.left-side svg',
            content: 'Or easily find the room on the map.',
        }
    ];

    const secondSteps = [
        {
            target: '.feedback-component',
            content: 'Give your feedback with 2 clicks.',
        },
        {
            target: '.submitBtn',
            content: 'Submit your feedback by clicking this button.',
        }
    ];

    const joyrideStyles = {
        options: {
            arrowColor: '#AAD5D5',
            backgroundColor: '#AAD5D5',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            primaryColor: '#73a2ff',
            textColor: '#fff',
            width: 300,
            zIndex: 1000,
        },
        buttonClose: {
            color: '#fff'
        },
        buttonNext: {
            backgroundColor: '#6A6AD2'
        },
        buttonBack: {
            marginRight: 10,
            color: '#fff'
        },
        tooltip: {
            borderRadius: '10px',
            textAlign: 'left'
        },
        tooltipTitle: {
            color: '#fff'
        },
        tooltipContent: {
            padding: '20px'
        },
        tooltipFooter: {
            textAlign: 'right'
        }
    };
    

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
                setOpacityRef0(0);
                setOpacityRef2(0); 
                gsap.to(contentRef1.current, { x: 0, opacity: 1, duration: 1 });
                gsap.to(contentRef2.current, { x: 0, opacity: 0, duration: 1 });
            } else {
                setOpacityRef1(0);
                setOpacityRef2(1);
                setOpacityRef0(0);
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

    const handleSubmitClick = async (event) => {

        //event.stopPropagation();
        
        event.preventDefault();
        console.log("Radio value: ",radioValue);
        console.log("Slider value: ",sliderValue);
        console.log("ID: ",selectedRoomId);
        const payload = {
            perception: sliderValue,
            usual_behaviour: radioValue,
            floor: floor,
            room: selectedRoomId
        };
        setUserFeedback(radioValue);

        const payload_json = JSON.stringify(payload);
        console.log(payload_json);
        try{
            const response = await fetch(`/api/submission`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(payload) 
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Feedback submitted successfully:', data);
                setFeedbackSubmitted(true);
                setRunSecond(false);
                setisSnowmanVisible(true); 
            } else {
                throw new Error(data.message); 
            }


        }
        catch (error) {
            console.error('Error submitting feedback:', error.message);
        }
    };

    const handleCloseAvatar = (event) => {
        event.stopPropagation();
        setisSnowmanVisible(false);       
        
    };

    const handleRadioChange = e => {
        
        setRadioValue(e.target.value);
    };

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    useEffect(() => {
        if (selectedRoomId) {
            fetch(`/api/feedback/${selectedRoomId}`)
                .then(response => response.json())
                .then(data => {
                    setRoomFeedback({
                        perceptions: data.commonPerceptions,
                        isControversial: data.isControversial,
                        message: data.message,
                        badgeContent: data.badgeContent,
                        userAgrees: data.userAgrees
                    });
                })
                .catch(error => console.error('Error fetching room feedback:', error));
        }
    }, [selectedRoomId]);

    useEffect(() => {
        if (opacityRef1 === 1) {
            setRunSecond(true);
            setRunInitial(false);
        }
    }, [opacityRef1]);

    
    
    
    const handleInitialJoyrideCallback = (data) => {
        const { status } = data;
        const finishedStatuses = ['finished', 'skipped'];
        if (finishedStatuses.includes(status)) {
            setRunInitial(false);
            if (opacityRef1 === 1) {
                setRunSecond(true);
            }
        }
    };

    const text1 = 'You are comfortable in every room you walk in'
    const text2 = 'You are the first to say Im cold'
    const text3 = 'You are the first to say Im hot'
    const split1 = text1.split("");
    const split2 = text2.split("");
    const split3 = text3.split("");


    

    return (
        <div className='selectorContainer'>
         <Joyride
                steps={initialSteps}
                run={runInitial}
                continuous={true}
                showSkipButton={true}
                showProgress={true}
                styles={joyrideStyles}
                callback={handleInitialJoyrideCallback}
            />

            <Joyride
                steps={secondSteps}
                run={runSecond}
                continuous={true}
                showSkipButton={true}
                showProgress={true}
                styles={joyrideStyles}
            />
        {error && <p>{error}</p>}
        {isSnowmanVisible && 

            <div className='svgContainer'>
                
                <div onClick={handleCloseAvatar} className='back-arrow' >                            
                    <CloseCircleOutlined className='circleClose'/>
                </div>
                {userFeedback === 'comfortable' && <img src={happyPeople} alt="Happy People" ref={svgRef} className='svgFloating'/>}
                {userFeedback === 'cold' && <img src={snowman_cool} alt="Snowman" ref={svgRef} className='svgFloating'/>}
                {userFeedback === 'hot' && <img src={fire} alt="Fire Person" ref={svgRef} className='svgFloating'/>}
                <h1>This is your personality badge!</h1>
                {userFeedback === 'comfortable' && <h3>You are comfortable in every room you walk in. Celebrate it!</h3>}
                {userFeedback === 'cold' && <h3>You are the first to say 'I'm cold'</h3>}
                {userFeedback === 'hot' && <h3>You are the first to say 'I'm hot'</h3>}

            </div>
        }
        
        {loading && <div ref={load} className='spinner'> <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color:"#fff" }} spin />}/> </div>  }
        
        <div ref={contentRef1} style={{position: 'absolute',zIndex: zIndexRef1, opacity: opacityRef1 }} className='contentRef1'>
            <a onClick={resetSelectedRoom} className='back-arrow'href="">                            
                <img src={backArrow} alt="Back" />
            </a>
            
            {feedbackSubmitted && (
                <>
                    <div className='title'>Room {selectedRoomNumber}'s Conditions</div>
                    <div className='conditions-component'>
                    
                        <div className='thermal-conditions'>
                            <div className='objective-temp'>{temperature !== null ? `${temperature}°` : "No data"}</div>
                            <div className='subjective-temp'>
                               {roomFeedback.message}
                            </div>

                        </div>
                        <div className='badge'>
                            {roomFeedback.badgeContent.map((perception, index) => (
                                <div className="badgeWrapper" key={index}>
                                    <img 
                                        src={perceptionImages[perception]} 
                                        alt={perception} 
                                        className='badgeImg' 
                                    />
                                    <span className='badgeTag'>{perception}</span>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </>

                
            )}

            <div className='feedback-component'>
                {feedbackSubmitted ? (
                    <div className='thankyou'>
                        <h3>Thank you for being awesome!</h3>
                        <p>We are now one step closer to improving LAB42!</p>
                        <p>Enjoy the rest of your studying session.</p>



                    </div>
                ) : (
                    <>
                        <h3>Do you have any complaints about the temperature of <span className='different-color'>Room {selectedRoomNumber}</span>?</h3>
                        <div className='question second'>
                            <CustomSlider value={sliderValue} onChange={handleSliderChange} className='custom-slider' min={0} max={6} />
                        </div>
                        <div className='question first'>
                            <RadioButtons value={radioValue} onChange={handleRadioChange}/>
                        </div>
                        
                        <a onClick={handleSubmitClick} href='#' className='submitBtn'>Submit</a>
                    </>
                )}
            </div>

            
            
        </div>
            
            <div className='contentRef2' ref={contentRef2} style={{position: 'absolute',zIndex: zIndexRef2, opacity: opacityRef2 }}>
                <ul className='floor-list-container'>
                    <li className='trigger' onMouseEnter={() => setisVisible(true)}>
                        <div className='selector-indication'>Select floor <DownOutlined /> </div>


                    <ul className="floor-list" style={{visibility:isVisible ? 'visible' : 'hidden'}}>
                    {Array.from({ length: 2 }, (_, i) => (
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
                    {floor === 0 ? 'You are now on the Ground Floor' : `You are now on the ${floor}${floor === 1 ? 'st' : (floor === 2 ? 'nd' : (floor === 3 ? 'rd' : 'th' ))} Floor`}
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