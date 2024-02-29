import React from 'react';
import { Link } from "react-router-dom";

const ModalList = ({ list = [], listName }) => {
    return (
        <>
            {list.length &&
                <div className='list'>
                    <div>
                        <span>{listName}</span>
                        <Link to={`/profile/${list[0]?.owner._id}`}
                        >
                            <b style={{ padding: '0 5px', fontSize: '16px' }}>{list[0].owner.login}</b>
                        </Link>
                        {list.length > 1 &&
                            <span>{`and ${list.length - 1} others`}</span>}
                    </div>
                </div>
            }
        </>
    );
};

export default ModalList;