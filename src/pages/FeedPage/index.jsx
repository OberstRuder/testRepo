import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actionFullGetAllPosts } from "../../redux/actions/actionsPost";
import { CFeedPost } from "../../components/Feed/FeedPost";
import './style.css';

const ShowPosts = ({ posts = [], getPosts }) => {
    const [flag, setFlag] = useState(true);
    const [flagControl, setFlagControl] = useState(true);

    useEffect(() => {
        if (flag && flagControl) {
            getPosts();
            setFlag(false);
            setFlagControl(false);
        }
    }, [flag, flagControl]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        setFlagControl(true);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [posts]);

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
            (e.target.documentElement.scrollTop + window.innerHeight) <
            200
        ) {
            setFlag(true);
        }
    };

    return (
        <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }} className='feed-cont' >
            {posts.length ?
                (posts || []).map((post) => {
                    return <CFeedPost key={post._id + Math.random() * 100} post={post} className={'card'} />;
                }) :
                <h3>Your feed seems to be empty... <br />
                    Let's find someone to follow!
                </h3>
            }
        </div>
    );
};

export const CShowPosts = connect(
    (state) => ({
        posts: state?.feed?.feedPosts,
    }),
    {
        getPosts: actionFullGetAllPosts,
    }
)(ShowPosts);