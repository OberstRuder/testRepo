import React, { useState } from 'react';
import { TextField } from "@mui/material";
import { connect } from "react-redux";
import { actionFullComment } from "../../redux/actions/actionComments";

const NewComment = ({ postId, sendComment, promise }) => {
    const [text, setText] = useState('')
    return (
        <div className='flexbox'>
            <TextField
                id="standard-basic"
                label="Add a comment"
                variant="standard"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: '100%', marginRight: '15px' }} />
            <button
                disabled={!text}
                onClick={() => (sendComment(postId, text), setText(''))}
                className='primeBtn'>Send</button>
        </div>
    );
};

export const CNewComment = connect((state) => ({
    promise: state?.promise
}), {
    sendComment: actionFullComment
}
)(NewComment);