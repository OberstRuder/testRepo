import { actionPromise } from "../redux/actions/actionPromise";
import { gql } from "./getgql";

export const queryPostById = (id, name = 'postByIdUser') =>
    actionPromise(
        name,
        gql(
            `query PostById($_id:String) {
        PostFind(query: $_id){
          _id createdAt title text,
          images {url}, comments{text _id owner{login _id avatar{url}} createdAt},
          owner {login, _id, nick, avatar {url},
          followers {_id, nick, login},
          following {_id, nick, login}},
          likesCount, likes { _id owner {_id login avatar{url}}}
        }
    } `,
            { _id: JSON.stringify([{ ___owner: id }, { sort: [{ _id: -1 }] }]) }
        )
    );

export const queryGetAllPosts = (skip, mappedFollowings) =>
    actionPromise(
        'allPosts',
        gql(
            `query allPosts($query: String!){
      PostFind(query: $query){
        _id, text, title,
        owner{_id, nick, login, avatar
         {url}
        },
        likes { _id owner {_id login avatar{url}}},
        likesCount,
        images{url},
        comments{text _id owner{login _id avatar{url}} createdAt},
        createdAt
    }
  }`,
            {
                query: JSON.stringify([
                    { ___owner: { $in: mappedFollowings } },
                    { sort: [{ _id: -1 }], skip: [skip || 0], limit: [3] },
                ])
            }
        )
    );

export const queryUploadPost = (title, text, photosId, postId) => {
    return actionPromise(
        'uploadPost',
        gql(
            `mutation newPost($post:PostInput){
    PostUpsert(post:$post){
      _id owner{_id}
    }
  }`,
            { post: { _id: postId, title: title, text: text, images: photosId } }
        )
    );
};


export const actionGetPostById = (id, name = 'postById') => {
    return actionPromise(
        name,
        gql(
            `query onePost ($id:String!){
        PostFindOne(query:$id){
         _id, text, title,
         owner{_id, nick, login, avatar
        {url}
        },  images{url _id},  createdAt
        likes { _id owner {_id login avatar{url}}}
        comments{text _id owner{login _id avatar{url}}  createdAt}
        }
    }`,
            { id: JSON.stringify([{ _id: id }]) }
        )
    );
};