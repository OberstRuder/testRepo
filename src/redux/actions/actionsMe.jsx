import { queryUserById } from "../../gql/userGql";
import { actionFullGetAllPosts } from "./actionsPost";
import { actionUploadFile } from "./actionUploadFiles";
import { queryChangeLogin, querySetAvatar } from "../../gql/meGql";
import { queryPostById } from "../../gql/postGql";

export const actionAboutMe = () => {
    return async (dispatch, getState) => {
        let id = getState().auth?.payload?.sub?.id
        await dispatch(queryUserById(id, 'me'))
        await dispatch(actionFullGetAllPosts())
    }
}

export const actionSetAvatar = (file) => async (dispatch, getState) => {
    await dispatch(actionUploadFile(file));
    let idImg = getState().promise?.uploadFile?.payload?._id;
    let idUser = getState().auth?.payload?.sub?.id;
    await dispatch(querySetAvatar(idUser, idImg))
    await dispatch(actionAboutMe());
    await dispatch(queryUserById(idUser));
    await dispatch(queryPostById(idUser));
};

export const actionFullChangeLogin = (login) => async (dispatch, getState) => {
    const _id = getState().auth?.payload?.sub?.id;
    const newData = { _id, login };
    let res = await dispatch(queryChangeLogin(newData));
    if (res) {
        await dispatch(actionAboutMe());
        await dispatch(actionFullGetAllPosts());
    }
};