import { actionLike, actionRemoveLike } from "../../gql/likeGql";
import { actionGetPostById, queryPostById } from "../../gql/postGql";
import { actionUpdatePosts } from "./actionsPost";

export const actionFullAddLike = (postId) => async (dispatch, getState) => {
    let likeId = await dispatch(actionLike(postId));
    if (likeId) {
        let likedPost = await dispatch(actionGetPostById(postId));
        let newPosts = (getState().feed?.feedPosts || []).map((item) =>
            item._id === likedPost._id ? likedPost : item
        );

        await dispatch(actionUpdatePosts(newPosts));
        await dispatch(queryPostById(likeId?.post?.owner._id));
    }
};

export const actionFullRemoveLike = (likeId) => async (dispatch, getState) => {
    let response = await dispatch(actionRemoveLike(likeId));
    if (response) {
        let likedRemovePost = await dispatch(actionGetPostById(response?.post?._id));
        let updPosts = (getState().feed?.feedPosts || []).map((item) =>
            item._id === likedRemovePost._id ? likedRemovePost : item
        );
        await dispatch(actionUpdatePosts(updPosts));
        await dispatch(queryPostById(response?.post?.owner._id));
    }
};