import React from 'react';
import Comment from "./Comment";
import {CNewComment} from "./NewComment";

const CommentList = ({comments, postId}) => {
    // console.log(comments)
    console.log(postId)
    return (
        <div className='comments-box'>
            <CNewComment postId={postId}/>
            {comments &&
                comments.map(item => {
                    return <Comment key={item._id} text={item.text} createdAt={item.createdAt} owner={item.owner}/>
                })
            }
        </div>
    );
};

export default CommentList;