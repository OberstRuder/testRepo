import React from 'react';
import { backendUrl } from "../../gql/backendUrl";
import def from "../../materials/default_avatar.png";

const Avatar = ({ url, className = 'avatar-pic' }) => {

    function handleImageError(e) {
        e.target.onError = null
        e.target.src = def
    }

    return (
        <>
            <img src={`${backendUrl + url}`}
                alt="ava"
                onError={handleImageError}
                className={className} />
        </>
    );
};

export default Avatar;