import { actionPromise } from "../redux/actions/actionPromise";
import { gql } from "./getgql";

export const querySubscribe = (id, userId, prevFollowing) =>
    actionPromise(
        'subscribe',
        gql(
            `mutation following($user:UserInput){
        UserUpsert( user:$user){
            following{_id}
        }
      }`,
            { user: { _id: id, following: [...(prevFollowing || []), { _id: userId }] } }
        )
    );

export const queryUnSubscribe = (id, prevFollowing) =>
    actionPromise(
        'unSubscribe',
        gql(
            `mutation unSubscribe($user:UserInput){
      UserUpsert( user:$user){
          following{_id}
      }
    }`,
            { user: { _id: id, following: [...prevFollowing] } }
        )
    );