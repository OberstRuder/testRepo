import { actionGetPostById, queryPostById } from "../../gql/postGql";
import { actionUpdatePosts } from "./actionsPost";
import { actionComment } from "../../gql/commentGql";

export const actionFullComment = (postId, text) => async (dispatch, getState) => {
    let commentId = await dispatch(actionComment(postId, text));
    console.log(commentId)
    console.log(postId)
    if (commentId) {
        let commentPost = await dispatch(actionGetPostById(postId));
        console.log(getState())
        let newPosts = (getState().feed?.feedPosts || []).map((item) =>
            item._id === commentPost._id ? commentPost : item
        );
        await dispatch(actionUpdatePosts(newPosts));
        console.log(newPosts)
        await dispatch(queryPostById(commentId?.post?.owner._id));
    }
};
