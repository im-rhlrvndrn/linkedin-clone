import React from 'react';

// styles
import './InputOptions.scss';

const InputOptions = ({ Icon, title, color }) => {
    return (
        <div className='inputOption'>
            {Icon && <Icon style={{ color: `${color}` }} />}
            <p>{title}</p>
        </div>
    );
};

export default InputOptions;
