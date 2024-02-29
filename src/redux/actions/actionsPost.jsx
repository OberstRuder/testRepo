import { ADD_POSTS, ADD_USERS, CHANGE_NEW_POST, PROMISE_CLEAR } from "../actionTypes";
import { queryGetAllPosts, queryUploadPost } from "../../gql/postGql";
import { actionClearPromise } from "./actionPromise";
import { actionAboutMe } from "./actionsMe";

export const actionAddPosts = (newPosts) => ({ type: ADD_POSTS, newPosts });
export const actionAddUsers = (newUsers) => ({ type: ADD_USERS, newUsers });

export const actionUpdatePosts = (updateNewPost) => ({
    type: CHANGE_NEW_POST,
    updateNewPost,
});

export const actionFullUploadPost = (title, text, photos, postId) => async (dispatch) => {
    let photosId = (photos || []).map((photo) => ({ _id: photo._id }));
    await dispatch(queryUploadPost(title, text, photosId, postId));
    await dispatch({ type: PROMISE_CLEAR, name: 'uploadPost' })
    await dispatch(actionClearPromise())
    await dispatch(actionAboutMe());
};

export const actionFullGetAllPosts = () => async (dispatch, getState) => {
    const {
        feed: { feedPosts = [] },
    } = getState();
    let myFollowings = (getState().promise?.me?.payload?.following || []).map(
        (item) => item._id
    );
    let usersPosts = await dispatch(queryGetAllPosts(feedPosts?.length, myFollowings));
    if (usersPosts) {
        dispatch(actionAddPosts(usersPosts));
    }
};
