import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import DefaultAvatar from "../../components/Avatar/DefaultAvatar";
import { CPreloaded } from "../../components/Uploading/Preloader";
import { queryPostById } from "../../gql/postGql";
import { CPostPreview } from '../../components/Post/PostPreview';
import './style.css';

const MyProfile = ({ myLogin,
    myPosts,
    myAvatar,
    myFollowing,
    myFollowers,
    myId,
    getPostById }) => {

    useEffect(() => {
        if (myId) {
            getPostById(myId)
        }
    }, [])

    function getLengthNum(array, text) {
        let num = !array ? '0' : array.length
        return num + ' ' + text
    }

    return (
        <CPreloaded promiseName='postByIdUser'>
            <div className='profile-box'>
                <div className="avatar">
                    {myAvatar ?
                        <Avatar url={myAvatar} className='avatar-pic' />
                        : <DefaultAvatar />
                    }
                </div>
                <div className='profile-info-box'>
                    <h3>
                        <span>{`${myLogin ? myLogin : 'no name'}`}</span>
                    </h3>
                    <div>
                        <div className='profile-nums'>
                            <button className='ordinaryBtn'>
                                <Link to={`/followers/${myId}`}>
                                    <div>{getLengthNum(myFollowers, 'followers')}</div>
                                </Link>
                            </button>
                            <button className='ordinaryBtn'>
                                <Link to={`/following/${myId}`}>
                                    <div>{getLengthNum(myFollowing, 'followings')}</div>
                                </Link>
                            </button>
                            <button className='ordinaryBtn'>
                                <div>{getLengthNum(myPosts, 'posts')}</div>
                            </button>
                        </div>
                        <div className='profile-buttons'>
                            <div>
                                <button className='primeBtn'>
                                    <Link to='/create'>Add post</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CPreloaded promiseName='postByIdUser'>
                <div className='gallery-cont'>
                    <div className='gallery'>
                        {(myPosts || []).map((post) => {
                            return <CPostPreview post={post}
                                key={post._id + Math.random() * 100}
                                className='gallery-item'
                            />
                        })
                        }
                    </div>
                </div>
            </CPreloaded>
        </CPreloaded>
    );
};

export const CMyProfile = connect((state) => ({
    myPosts: state?.promise?.postByIdUser?.payload,
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
    myFollowers: state?.promise?.me?.payload?.followers,
    myAvatar: state?.promise?.me?.payload?.avatar?.url,
    myLogin: state?.promise?.me?.payload?.login,
}), {
    getPostById: queryPostById
})(MyProfile);