import { gql } from "./getgql";
import { actionPromise } from "../redux/actions/actionPromise";

export const queryLogin = (login, password) => {
    return actionPromise(
        'login',
        gql(
            `query login($login:String!, $password:String!) {
        login(login: $login, password: $password)
      }`,
            { login: login, password: password }
        )
    );
};