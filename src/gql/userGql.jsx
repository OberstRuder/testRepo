import { actionPromise } from "../redux/actions/actionPromise";
import { gql } from "./getgql";

export const queryGetUsers = (skip) =>
    actionPromise(
        'allUsers',
        gql(
            `query allUsers($query: String!){
      UserFind(query: $query){
        _id, login, createdAt, nick, avatar 
         {_id, url}
       }
    }`,
            {
                query: JSON.stringify([{}, { sort: [{ login: -1 }], skip: [skip || 0], paginationNumber: [10] }]),
            }
        )
    );

export const queryUserById = (id, name = 'userById') =>
    actionPromise(
        name,
        gql(
            `query UserById($_id:String) {
        UserFindOne(query: $_id){
          _id, nick, login, createdAt, avatar {url}
          followers {_id, nick, login, avatar{url}},
          following {_id, nick, login, avatar{url}}
          likes { _id owner {_id login, avatar{url}}}
          } 
        }`,
            { _id: JSON.stringify([{ _id: id }]) }
        )
    );

export const queryUserByLogin = (login) =>
    async (dispatch) => {
        let promise = await actionPromise(
            'foundUsers',
            await gql(
                `query UserById($login:String) {
        UserFind(query: $login){
          _id, nick, login, createdAt, avatar {url}
          followers {_id, nick, login},
          following {_id, nick, login}
          } 
        }`,
                {
                    login: JSON.stringify([{ login: `/${login}/` }])
                }
            )
        )
        await dispatch(promise)
    };