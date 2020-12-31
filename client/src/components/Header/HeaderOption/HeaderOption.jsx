import React from 'react';
import { Avatar } from '@material-ui/core';

// styles
import './HeaderOption.scss';

const HeaderOption = ({ avatar, title, Icon, onClick }) => {
    return (
        <div className='headerOption' onClick={onClick}>
            {Icon && <Icon className='headerOption__icon' />}
            {avatar && (
                <Avatar className='headerOption__icon' src={avatar}>
                    {avatar}
                </Avatar>
            )}
            <h3 className='headerOption__title'>{title}</h3>
        </div>
    );
};

export default HeaderOption;
