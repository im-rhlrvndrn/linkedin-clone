import React from 'react';
import useWindowSize from '../../utils/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, setAppState } from '../../features/userSlice';
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
    const _windowSize = useWindowSize();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
        auth.signOut();
    };

    const _setAppState = (state) => {
        if (_windowSize?.width <= 1024) {
            dispatch(setAppState(state));
        }
    };

    return (
        <div className='header'>
            {_windowSize?.width > 1024 && (
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
            )}
            <div className='header__right'>
                <HeaderOption Icon={HomeIcon} title='Home' onClick={() => _setAppState('feed')} />
                <HeaderOption Icon={MyNetworkIcon} title='My Network' />
                <HeaderOption Icon={BusinessCenterIcon} title='Jobs' />
                <HeaderOption Icon={ChatIcon} title='Chats' />
                <HeaderOption
                    Icon={NotificationsIcon}
                    title='Notifications'
                    onClick={() => _setAppState('widgets')}
                />
                <HeaderOption
                    avatar={user?.avatarURL ? user?.avatarURL : user?.displayName[0]}
                    title='me'
                    onClick={() => {
                        if (_windowSize?.width <= 1024) {
                            _setAppState('sidebar');
                        } else logoutUser();
                    }}
                />
            </div>
        </div>
    );
};

export default Header;
