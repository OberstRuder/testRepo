import { gql } from "./getgql";
import { actionPromise } from "../redux/actions/actionPromise";

export const querySetAvatar = (idUser, idImg) => (
    actionPromise(
        'setAvatar',

        gql(
            `mutation setAvatar($avatar:UserInput){
    UserUpsert(user:$avatar){
        _id, avatar{
            _id
        }
    }
}`,
            { avatar: { _id: idUser, avatar: { _id: idImg } } }
        )
    )
);

export const queryChangeLogin = (newLogin) =>
    actionPromise(
        'changeLogin',
        gql(
            `mutation changeLogin($user:UserInput){
                    UserUpsert(user:$user){
                        _id  login                        
                    }
            }`,
            { user: newLogin }
        )
    );