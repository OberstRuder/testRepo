import {ADD_POSTS, ADD_USERS, CHANGE_NEW_POST} from "../actionTypes";

export function feedReducer(state = {}, { type, newPosts, newUsers, updateNewPost }) {
    if (type === ADD_POSTS) {
        return {
            ...state,
            feedPosts: state?.feedPosts ? [...state.feedPosts, ...newPosts] : [...newPosts],
        };
    }
    if (type === ADD_USERS) {
        return {
            ...state,
            feedUsers: state?.feedUsers ? [...state.feedUsers, ...newUsers] : [...newUsers],
        };
    }
    if (type === CHANGE_NEW_POST) {
        return {
            ...state,
            feedPosts: [...updateNewPost],
        };
    }
    return state;
}
