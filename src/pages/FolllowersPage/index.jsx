import React from 'react';
import { connect } from 'react-redux';
import { OneUserInList } from "../../components/Like/OneUserInList";
import './style.css';

const Followers = ({ userFollowers, myId, myFollowers }) => {

    let id = window.location.pathname.replace('/followers/', '')

    function getFollowersArray() {
        return id === myId ? myFollowers : userFollowers
    }

    return (
        <>
            <div className='followers-cont'>
                <h2>Followers</h2>
                {getFollowersArray() ? (
                    <>
                        {(getFollowersArray() || []).map((user) => {
                            return <OneUserInList key={user._id} user={user} />;
                        })}
                    </>
                ) : (
                    <h3>The list is empty</h3>
                )}
            </div>
        </>
    );
};

export const CFollowers = connect((state) => ({
    userFollowers: state?.promise?.userById?.payload?.followers,
    myFollowers: state?.promise?.me?.payload?.followers,
    myId: state?.promise?.me?.payload?._id
}))(Followers);