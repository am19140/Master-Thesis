import React, { useState } from 'react';
import { Slider } from 'antd';
import fireGif from '../images/icon-fire.gif'
import snowflakeGif from '../images/icon-snowflake.gif'

const ThermalSlider = () => {
  const [value, setValue] = useState(0); // Default to neutral

  const createMarks = (currentValue) => ({
    3: currentValue === 3 ? 'Hot' : '',
    2: currentValue === 2 ? 'Warm' : '',
    1: currentValue === 1 ? 'Slightly warm' : '',
    0: currentValue === 0 ? 'Comfortable' : '',
    '-1': currentValue === -1 ? 'Slightly cool' : '',
    '-2': currentValue === -2 ? 'Cool' : '',
   ' -3': currentValue === -3 ? 'Cold' : ''
  });

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <p>How do you feel about this room?</p>
      <div className='slider-wrapper'>
        
        <img src={snowflakeGif}></img>
        <Slider
          min={-3}
          max={3}
          marks={createMarks(value)}
          value={value}
          onChange={handleChange}
          tooltip={{
            open: false
          }}
          
        />
        <img src={fireGif}></img>      
      </div>
    </>
  );
};

export default ThermalSlider;
