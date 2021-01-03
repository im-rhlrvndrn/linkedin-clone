import React from 'react';
import useWindowSize from '../../../utils/useWindowSize';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { Avatar } from '@material-ui/core';

// styles
import './HeaderOption.scss';

const HeaderOption = ({ avatar, title, Icon, onClick }) => {
    const user = useSelector(selectUser);
    const _windowSize = useWindowSize();

    return (
        <div className='headerOption' onClick={onClick}>
            {Icon && <Icon className='headerOption__icon' />}
            {avatar && (
                <Avatar className='headerOption__icon' src={avatar}>
                    {user?.displayName[0]}
                </Avatar>
            )}
            {_windowSize?.width > 500 && <h3 className='headerOption__title'>{title}</h3>}
        </div>
    );
};

export default HeaderOption;
