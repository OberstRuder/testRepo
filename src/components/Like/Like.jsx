import React from 'react';
import { IconButton } from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import { connect } from "react-redux";
import { actionFullAddLike, actionFullRemoveLike } from "../../redux/actions/actionsLike";
import ModalBox from "./ModalBox";
import { Link } from "react-router-dom";

const scale = {
    transform: 'scale(1.4)'
}
const Like = ({ post = [], onLike, onDeleteLike, myId, likeClass, likeInfoClass }) => {

    const { likes = [] } = post

    let isLiked = post.likes.filter((like) => like.owner._id === myId)

    return (
        <div style={{ width: '100%', height: '45px', display: 'flex' }}>
            <IconButton onClick={() => {
                isLiked.length !== 0 ? onDeleteLike(isLiked[0]._id) : onLike(post._id)
            }}
                aria-label="add to favorites">
                <div
                    className="like-button">
                    {isLiked.length !== 0 ? (
                        <FavoriteTwoToneIcon className='red' style={scale} />
                    ) : (
                        <FavoriteBorderTwoToneIcon style={scale} />
                    )}
                    {post?.likes && (
                        <p className="like-count">
                            {post?.likes.length === 0 ? 0 : post?.likes.length}
                        </p>
                    )}
                </div>
            </IconButton>
            <ModalBox likes={likes} myId={myId}>
                <div>
                    {likes.length > 0 &&
                        <div className={likeClass}>
                            <div className={likeInfoClass} style={{ display: 'flex' }}>
                                <span>LIKED BY</span>
                                <Link to={`/profile/${likes[0].owner._id}`}
                                >
                                    <b style={{ padding: '0 5px', fontSize: '13px' }}>{likes[0].owner.login}</b>
                                </Link>
                                {likes.length > 1 &&
                                    <span>{`and ${likes.length - 1} others`}</span>}
                            </div>
                        </div>
                    }

                </div>
            </ModalBox>
        </div>
    );
};

export const CLike = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
}), {
    onLike: actionFullAddLike,
    onDeleteLike: actionFullRemoveLike
})(Like);
