import React from 'react';
import useWindowSize from '../../utils/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';
import { Avatar } from '@material-ui/core';

// styles
import './Sidebar.scss';

// React components
import SidebarOptions from '../SidebarOptions/SidebarOptions';

const Sidebar = () => {
    const _windowSize = useWindowSize();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div className='sidebar'>
            <div className='sidebar__top'>
                <img
                    className='sidebar__top__background'
                    src='https://images.unsplash.com/photo-1609004866740-d5647459b330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80'
                    alt='Background'
                />
                <Avatar className='sidebar__top__avatar' src={user?.avatarURL}>
                    {user?.displayName[0].toUpperCase()}
                </Avatar>
                <h2>{user?.displayName}</h2>
                <p className='sidebar__top__subtitle'>{user?.email}</p>
            </div>

            <div className='sidebar__stats'>
                <div className='sidebar__stats__stat'>
                    <p>Who viewed you</p>
                    <p className='sidebar__stats__stat__number'>2,544</p>
                </div>
                <div className='sidebar__stats__stat'>
                    <p>Views on post</p>
                    <p className='sidebar__stats__stat__number'>544</p>
                </div>
            </div>

            <div className='sidebar__bottom'>
                <SidebarOptions
                    title='Recent'
                    options={['ReactJS', 'programming', 'GraphQL', 'NodeJS']}
                />
            </div>
            {_windowSize?.width <= 1024 && (
                <button
                    onClick={() => {
                        dispatch(logout());
                        auth.signOut();
                    }}
                    className='logout'
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Sidebar;
