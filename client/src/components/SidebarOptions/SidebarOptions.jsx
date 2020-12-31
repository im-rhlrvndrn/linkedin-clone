import React from 'react';

// styles
import './SidebarOptions.scss';

const SidebarOptions = ({ title, options }) => {
    return (
        <div className='sidebarOptions'>
            <h2>{title}</h2>
            {options.map((option, index) => (
                <p key={index} className='sidebarOptions__option'>
                    <span className='sidebarOptions__option__hashtag'>#</span>
                    {option}
                </p>
            ))}
        </div>
    );
};

export default SidebarOptions;
