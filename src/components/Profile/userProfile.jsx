import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { actionFullSubscribe, actionFullUnSubscribe, } from '../../redux/actions/actionSubscribe'
import Avatar from "../../components/Avatar/Avatar";
import DefaultAvatar from "../../components/Avatar/DefaultAvatar";
import { Link } from "react-router-dom";
import { CPreloaded } from '../../components/Uploading/Preloader';
import { queryPostById } from "../../gql/postGql";
import { CPostPreview } from '../../components/Post/PostPreview';
import { actionClearPromiseByName } from "../../redux/actions/actionPromise";
import { queryUserById } from "../../gql/userGql";
import './style.css';

const UserProfile = ({ userId,
    userFollowing,
    userFollowers,
    userAvatar,
    userLogin,
    userPosts = [],
    doIFollow,
    onFollow,
    onUnfollow,
    clearPromise,
    myId }) => {

    function getLengthNum(array, text) {
        let num = !array ? '0' : array.length
        return num + ' ' + text
    }

    useEffect(() => {
        clearPromise('postByIdUser')
        return () => {
            clearPromise('postByIdUser')
        }
    }, [])

    return (
        <>
            <CPreloaded promiseName='postByIdUser'>
                <div className='profile-box'>
                    <div className="avatar">
                        {userAvatar ?
                            <Avatar url={userAvatar} className='avatar-pic' />
                            : <DefaultAvatar />
                        }

                    </div>
                    <div className='profile-info-box'>
                        <h3> <span>{`${userLogin ? userLogin : 'no name'}`}</span></h3>
                        <div>
                            <div className='profile-nums'>
                                <button className='ordinaryBtn'>
                                    <Link to={`/followers/${userId}`}>
                                        <div>{getLengthNum(userFollowers, 'followers')}</div>
                                    </Link>
                                </button>
                                <button className='ordinaryBtn'>
                                    <Link to={`/following/${userId}`}>
                                        <div>{getLengthNum(userFollowing, 'followings')}</div>
                                    </Link>
                                </button>
                                <button className='ordinaryBtn'>
                                    <div>{getLengthNum(userPosts, 'posts')}</div>
                                </button>
                            </div>
                            <div className='profile-buttons'>
                                {(!doIFollow ? (
                                    <button onClick={() => onFollow(myId, userId)} className='primeBtn' children='Follow' />
                                ) : (
                                    <button onClick={() => onUnfollow(myId, userId)} className='primeBtn' children='Unfollow' />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    <>
                        <div className='gallery-cont'>
                            <div className='gallery'>
                                {(userPosts || []).map((post) => {
                                    return <CPostPreview post={post}
                                        key={post._id + Math.random() * 100}
                                        className='gallery-item'
                                    />
                                })
                                }
                            </div>
                        </div>
                    </>
                </>
            </CPreloaded>
        </>
    );
};

export const CUserProfile = connect((state) => ({
    userFollowing: state?.promise?.userById?.payload?.following,
    userFollowers: state?.promise?.userById?.payload?.followers,
    userAvatar: state?.promise?.userById?.payload?.avatar?.url,
    userLogin: state?.promise?.userById?.payload?.login,
    userPosts: state?.promise?.postByIdUser?.payload,
}), {
    onFollow: actionFullSubscribe,
    onUnfollow: actionFullUnSubscribe,
    getPostById: queryPostById,
    clearPromise: actionClearPromiseByName,
    onUserById: queryUserById
})(UserProfile);