import { queryGetUsers } from "../../gql/userGql";
import { actionAddUsers } from "./actionsPost";

export const actionFullGetUsers = () => async (dispatch, getState) => {
    const {
        feed: { feedUsers = [] },
    } = getState();
    let searchUsers = await dispatch(queryGetUsers(feedUsers?.length));
    if (searchUsers) {
        dispatch(actionAddUsers(searchUsers));
    }
};