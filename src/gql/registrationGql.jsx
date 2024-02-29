import { gql } from "./getgql";
import { actionPromise } from "../redux/actions/actionPromise";

export const queryRegistration = (login, password) => (
    actionPromise('register',
        gql(
            `mutation reg($login: String!, $password: String!) {
        createUser(login: $login, password: $password)
        {
          _id
          login
          
        }
    }`, { login: login, password: password })
    )
);