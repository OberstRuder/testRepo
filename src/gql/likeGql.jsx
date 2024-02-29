import { actionPromise } from "../redux/actions/actionPromise";
import { gql } from "./getgql";

export const actionLike = (id) =>
    actionPromise(
        'likePost',
        gql(
            `mutation likePost($like:LikeInput){
        LikeUpsert( like:$like){
            _id post{_id owner{_id}}
        }
      }`,
            { like: { post: { _id: id } } }
        )
    );

export const actionRemoveLike = (id) =>
    actionPromise(
        'removeLike',
        gql(
            `mutation LikeRemove($like:LikeInput){
          LikeDelete(like:$like){
              _id post{_id owner{_id}} 
          }
      }`,
            { like: { _id: id } }
        )
    );