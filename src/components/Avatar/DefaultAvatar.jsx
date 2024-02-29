import React from 'react';
import defaultAva from '../../materials/default_avatar.png'

const DefaultAvatar = ({className = 'avatar-pic'}) => {
    return (
        <div>
            <img src={defaultAva}
                 alt="ava"
                 className={className} />
        </div>
    );
};

export default DefaultAvatar;