import { PROMISE, PROMISE_CLEAR } from "../actionTypes";

export const actionPending = (name) =>
    ({ type: PROMISE, status: 'PENDING', name });

export const actionResolved = (name, payload) =>
    ({ type: PROMISE, status: 'RESOLVED', name, payload });

export const actionRejected = (name, error) =>
    ({ type: PROMISE, status: 'REJECTED', name, error });

export const actionClearPromise = () => ({ type: PROMISE_CLEAR, name: 'uploadFile' });
export const actionClearPromiseByName = (name) => ({ type: PROMISE_CLEAR, name: name });

export const actionPromise = (name, promise) => (
    async (dispatch) => {
        dispatch(actionPending(name))
        try {
            let data = await promise
            dispatch(actionResolved(name, data))
            return data
        }
        catch (error) {
            dispatch(actionRejected(name, error))
        }
    }
);
