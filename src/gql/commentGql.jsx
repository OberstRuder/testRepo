import { actionPromise } from "../redux/actions/actionPromise";
import { gql } from "./getgql";

export const actionComment = (id, text) =>
    actionPromise(
        'commentPost',
        gql(
            `mutation commentPost($comment:CommentInput){
        CommentUpsert( comment:$comment){
            _id  post{_id owner{_id}} 
        }
      }`,
            { comment: { post: { _id: id }, text: text } }
        )
    );