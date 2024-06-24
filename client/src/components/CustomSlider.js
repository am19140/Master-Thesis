import React, { useState } from 'react';
import { Slider } from 'antd';
import fireGif from '../images/icon-fire.gif'
import snowflakeGif from '../images/icon-snowflake.gif'

const CustomSlider = ({value, onChange}) => {

  const createMarks = (currentValue) => ({
    3: currentValue === 3 ? 'Hot' : '',
    2: currentValue === 2 ? 'Warm' : '',
    1: currentValue === 1 ? 'Slightly warm' : '',
    0: currentValue === 0 ? 'Comfortable' : '',
    '-1': currentValue === -1 ? 'Slightly cool' : '',
    '-2': currentValue === -2 ? 'Cool' : '',
   ' -3': currentValue === -3 ? 'Cold' : ''
  });

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  return (
    <>
    <h4>Right now, how are you feeling about this room?</h4>
      <div className='slider-wrapper'>
        
        <img src={snowflakeGif}></img>
        <Slider
          min={-3}
          max={3}
          marks={createMarks(value)}
          value={value}
          onChange={onChange}
          tooltip={{
            open: false
          }}
          
        />
        <img src={fireGif}></img>      
      </div>
    </>
  );
};

export default CustomSlider;
