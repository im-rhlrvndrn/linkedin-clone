import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { login, logout, selectUser } from '../../features/userSlice';

// styles
import './Home.scss';

// React components
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';
import Login from '../Login/Login';
import Widgets from '../../components/Widgets/Widgets';

const Home = () => {
    const user = useSelector(selectUser);
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
        <div className='home'>
            <Header />
            {!user ? (
                <Login />
            ) : (
                <div style={{ display: 'flex' }} className='main__body'>
                    <Sidebar />
                    <Feed />
                    <Widgets />
                </div>
            )}
        </div>
    );
};

export default Home;
