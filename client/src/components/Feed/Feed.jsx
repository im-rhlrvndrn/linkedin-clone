import React, { useState, useEffect, useRef } from 'react';
import FlipMove from 'react-flip-move';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase';

// icons
import CreateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';

// styles
import './Feed.scss';

// React components
import InputOptions from '../InputOptions/InputOptions';
import Post from '../Post/Post';

const Feed = () => {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');
    let keysPressed = {};
    const postForm = useRef(null);

    useEffect(() => {
        const unsubscribe = db
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            });

        return () => unsubscribe();
    }, []);

    const createPost = (event) => {
        event.preventDefault();

        if (input === '') return;

        db.collection('posts').add({
            username: user?.displayName,
            bio: user?.email,
            message: input,
            avatarURL: user?.avatarURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('');
    };

    return (
        <div className='feed'>
            <div className='feed__inputContainer'>
                <div className='feed__inputContainer__input'>
                    <form onSubmit={createPost}>
                        <textarea
                            autoComplete='off'
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(event) => {
                                keysPressed[event.key] = true;

                                if (keysPressed['Control'] && event.key == 'Enter') {
                                    postForm.current.click();
                                }
                            }}
                            onKeyUp={(event) => {
                                delete keysPressed[event.key];
                            }}
                            value={input}
                            type='text'
                            name='newpost'
                            id='newpost'
                            placeholder='Start a post'
                        />
                        <button ref={postForm} type='submit'>
                            Post
                        </button>
                    </form>
                    <div
                        className='submitIcon'
                        onClick={(event) => {
                            if (input.length) createPost(event);
                        }}
                    >
                        {input.length ? <SendIcon /> : <CreateIcon />}
                    </div>
                </div>
                <div className='feed__inputContainer__inputOptions'>
                    <InputOptions Icon={ImageIcon} title='photo' color='#70b5f9' />
                    <InputOptions Icon={SubscriptionsIcon} title='video' color='#e7a33e' />
                    <InputOptions Icon={EventNoteIcon} title='event' color='#c0cbcd' />
                    <InputOptions
                        Icon={CalendarViewDayIcon}
                        title='write article'
                        color='#7fc15e'
                    />
                </div>
            </div>

            <div className='postContainer'>
                <FlipMove>
                    {posts.map(({ id, avatarURL, username, bio, message }) => (
                        <Post
                            key={id}
                            id={id}
                            avatarURL={avatarURL}
                            username={username}
                            bio={bio}
                            message={message}
                        />
                    ))}
                </FlipMove>
            </div>
        </div>
    );
};

export default Feed;
