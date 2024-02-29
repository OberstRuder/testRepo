import { actionPromise } from "./actionPromise";
import { backendUrl } from "../../gql/backendUrl";

export const actionUploadFile = (file) => {
    let formdata = new FormData();
    formdata.append('photo', file);

    return actionPromise(
        'uploadFile',
        fetch(backendUrl + 'upload', {
            method: "POST",
            headers: localStorage.authToken
                ? { Authorization: 'Bearer ' + localStorage.authToken }
                : {},
            body: formdata
        }).then(res => res.json()))
};

export const actionUploadFiles = (files) => {
    let promiseResult = [];

    for (let i = 0; i < files.length; i++) {
        let formdata = new FormData();
        formdata.append('photo', files[i]);
        let oneRes = fetch(backendUrl + 'upload', {
            method: 'POST',
            headers: localStorage.authToken
                ? { Authorization: 'Bearer ' + localStorage.authToken }
                : {},
            body: formdata,
        });

        promiseResult.push(oneRes);
    }
    return actionPromise(
        'uploadFile',
        Promise.all(promiseResult)
            .then((res) => res.map((item) => item.json()))
            .then((res) => Promise.all(res))
    );
};