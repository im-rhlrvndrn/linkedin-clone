import React, { useState } from 'react';
import { auth } from '../../firebase';
import { login } from '../../features/userSlice';

// styles
import './Login.scss';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const [isRegistering, setIsRegistering] = useState(false);
    const [fullName, setFullName] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = (event) => {
        event.preventDefault();
        if (fullName === '') return alert('Enter a fullName');

        auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
            userAuth.user
                .updateProfile({
                    displayName: fullName,
                    photoURL: avatarURL,
                })
                .then(() => {
                    dispatch(
                        login({
                            uid: userAuth.user.uid,
                            email: userAuth.user.email,
                            displayName: fullName,
                            avatarURL: avatarURL,
                        })
                    );
                });
        });
    };

    const loginUser = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
            dispatch(
                login({
                    uid: userAuth.user.uid,
                    email: userAuth.user.email,
                    displayName: userAuth.user.displayName,
                    avatarURL: userAuth.user.photoURL,
                })
            );
        });
    };

    return (
        <div className='login'>
            <div className='login__wrapper'>
                <img
                    src='https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks'
                    alt='large linkedin logo'
                />
                <form>
                    {isRegistering && (
                        <input
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            type='text'
                            placeholder='Full Name'
                            required
                        />
                    )}
                    {isRegistering && (
                        <input
                            value={avatarURL}
                            onChange={(event) => setAvatarURL(event.target.value)}
                            type='text'
                            placeholder='Profile pic URL'
                        />
                    )}
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type='email'
                        placeholder='Email address'
                        required
                    />
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type='password'
                        placeholder='Password'
                        required
                    />
                    <button type='submit' onClick={isRegistering ? registerUser : loginUser}>
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                <p>
                    {isRegistering ? 'Already have an account?' : "Don't have an account yet?"}
                    <span onClick={() => setIsRegistering(!isRegistering)}>
                        {' '}
                        {isRegistering ? 'Login' : 'Register now'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
