import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./reducers/authReducer";
import {promiseReducer} from "./reducers/promiseReducer";
import {feedReducer} from "./reducers/feedReducer";
import { thunk } from "redux-thunk";

export const store = createStore(
    combineReducers({
        auth: authReducer,
        promise: promiseReducer,
        feed: feedReducer
    }),
    applyMiddleware(thunk)
)
