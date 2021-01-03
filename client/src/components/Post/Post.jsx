import React, { forwardRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase';

// icons
import { Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// styles
import './Post.scss';

// React components
import InputOptions from '../InputOptions/InputOptions';

const Post = forwardRef(({ id, username, bio, message, avatarURL }, ref) => {
    const user = useSelector(selectUser);
    const [postOptions, setPostOptions] = useState(false);

    const deletePost = (postId, userEmail) => {
        console.log('Delete post initiated!');
        if (user?.email === userEmail)
            db.collection('posts')
                .doc(`${postId}`)
                .delete()
                .then(() => {
                    console.log(`Document with id [${postId}] successfully deleted!`);
                })
                .catch((error) => {
                    console.error('Error removing document: ', error);
                });
    };

    return (
        <div ref={ref} className='post'>
            <div className='post__header'>
                <Avatar src={avatarURL} className='post__header__avatar'>
                    {username[0]}
                </Avatar>
                <div className='post__header__details'>
                    <h2>{username}</h2>
                    <p className='post__header__details__bio'>{bio}</p>
                </div>
                <div className='postOptionsIcon' onClick={() => setPostOptions(!postOptions)}>
                    <MoreVertIcon />
                </div>
                {postOptions && (
                    <div className='post__header__postOptions'>
                        {user?.email === bio && (
                            <span
                                onClick={() => {
                                    deletePost(id, bio);
                                    setPostOptions(false);
                                }}
                                className='post__header__postOptions__option'
                            >
                                Delete post
                            </span>
                        )}
                        <span
                            className='post__header__postOptions__option'
                            onClick={() => setPostOptions(false)}
                        >
                            Edit post
                        </span>
                    </div>
                )}
            </div>
            <ReactMarkdown className='post__message' plugins={[gfm]} children={message} />
            {/* <pre className='post__message'>{message}</pre> */}
            <div className='post__interactionOptions'>
                <InputOptions Icon={ThumbUpIcon} title='Like' color='#999' />
                <InputOptions Icon={CommentIcon} title='Comment' color='#999' />
                <InputOptions Icon={ShareIcon} title='Share' color='#999' />
                <InputOptions Icon={SendIcon} title='Send' color='#999' />
            </div>
        </div>
    );
});

export default Post;
