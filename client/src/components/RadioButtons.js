import React from 'react';
import { Radio } from 'antd';

const RadioButtons = ({ value, onChange }) => {
    return (
        <div className="custom-radio">
            <h4>Are you usually cold, comfortable or hot?</h4>
            <Radio.Group onChange={onChange} value={value} className='radio-btns'>
                <Radio className='radio-option cold-option' value="cold">Cold</Radio>
                <Radio value="comfortable" className='radio-option comf-option'>Comfortable</Radio>
                <Radio value="hot" className='radio-option hot-option'>Hot</Radio>
            </Radio.Group>
        </div>
    );
};

export default RadioButtons;
