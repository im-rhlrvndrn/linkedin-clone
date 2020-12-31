import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';

// icons
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import MyNetworkIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';

// styles
import './Header.scss';

// React icons
import HeaderOption from './HeaderOption/HeaderOption';

const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const logoutUser = () => {
        dispatch(logout());
        auth.signOut();
    };

    console.log(user);

    return (
        <div className='header'>
            <div className='header__left'>
                <img
                    src='https://flaticon.com/svg/static/icons/svg/174/174857.svg'
                    alt='Linkedin icon'
                />
                <div className='header__left__search_container'>
                    <SearchIcon />
                    <input
                        type='text'
                        name='header_search'
                        id='header_search'
                        placeholder='Search'
                    />
                </div>
            </div>
            <div className='header__right'>
                <HeaderOption Icon={HomeIcon} title='Home' />
                <HeaderOption Icon={MyNetworkIcon} title='My Network' />
                <HeaderOption Icon={BusinessCenterIcon} title='Jobs' />
                <HeaderOption Icon={ChatIcon} title='Chats' />
                <HeaderOption Icon={NotificationsIcon} title='Notifications' />
                <HeaderOption
                    avatar={user?.avatarURL ? user?.avatarURL : user?.displayName[0]}
                    title='me'
                    onClick={logoutUser}
                />
            </div>
        </div>
    );
};

export default Header;
