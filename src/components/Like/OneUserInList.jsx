import React from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from "../Avatar/DefaultAvatar";
import Avatar from "../Avatar/Avatar";

export const OneUserInList = ({ user }) => {

    return (
        <>
            <div className="search-item">
                <Link to={`/profile/${user?._id}`}>
                    {user?.avatar === null ? (
                        <DefaultAvatar className='small-ava avatarPic' />
                    ) : (
                        <Avatar
                            url={user?.avatar?.url}
                            className='small-ava avatarPic' />
                    )}
                </Link>
                <Link to={`/profile/${user?._id}`}>
                    <div>{user?.login ? user.login : 'anon'}</div>
                </Link>
            </div>
        </>
    );
};