import React, { useEffect } from 'react';
import useWindowSize from '../../utils/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { login, logout, selectAppState, selectUser } from '../../features/userSlice';

// styles
import './Home.scss';

// React components
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';
import Login from '../Login/Login';
import Widgets from '../../components/Widgets/Widgets';

const Home = () => {
    const _windowSize = useWindowSize();
    const user = useSelector(selectUser);
    const appState = useSelector(selectAppState);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        email: userAuth.email,
                        displayName: userAuth.displayName,
                        uid: userAuth.uid,
                        avatarURL: userAuth.photoURL,
                    })
                );
            } else dispatch(logout());
        });
    }, []);

    return (
        <>
            <Header />
            <div className='home'>
                {!user ? (
                    <Login />
                ) : (
                    <div style={{ display: 'flex' }} className='main__body'>
                        {_windowSize?.width > 1024 ? (
                            <>
                                <Sidebar />
                                <Feed />
                                <Widgets />
                            </>
                        ) : appState === 'feed' ? (
                            <Feed />
                        ) : appState === 'sidebar' ? (
                            <Sidebar />
                        ) : appState === 'widgets' ? (
                            <Widgets />
                        ) : null}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
