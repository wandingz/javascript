import { loading, LOADING_PENDING, LOADING_ERROR, LOADING_FINISHED } from './loading.js';

export const CREATE_REQUEST = "CREATE_REQUEST";
export const GET_REQUESTS = "GET_REQUESTS";
export const DELETE_REQUEST = "DELETE_REQUEST";
export const UPDATE_REQUEST = "UPDATE_REQUEST";

export function createRequest(form) {
    return (dispatch) => {
        dispatch(loading('CreateRequest', LOADING_PENDING));
        fetch('http://localhost:4000/request', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        }).then(d => d.json()).then(data => {
            dispatch({
                type: CREATE_REQUEST,
                data: data,
            })
            dispatch(loading('CreateRequest', LOADING_FINISHED));
            dispatch(loading('CreateRequest', undefined));
        }).catch(err => {
            console.log(err);
            dispatch(loading('CreateRequest', LOADING_ERROR));
        })
    };
}

export function getList() {
    return (dispatch) => {
        fetch('http://localhost:4000/requests', {
            method: 'GET',
            credentials: 'include',
        }).then(d => d.json()).then(requests => {
            dispatch({
                type: GET_REQUESTS,
                data: requests,
            });
        }).catch(err => {
            console.log(err);
        })
    };
}

export function patchRequest(form) {
    return (dispatch) => {
        fetch('http://localhost:4000/request/' + form.id, {
            method: 'PATCH',
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        }).then(d => d.json()).then(request => {
            dispatch({
                type: UPDATE_REQUEST,
                data: request,
            });
        }).catch(err => {
            console.log(err);
        })
    };
}

export function deleteRequest(form) {
    return (dispatch) => {
        fetch('http://localhost:4000/request/' + form.id, {
            method: 'DELETE',
            credentials: 'include',
        }).then(d => d.json()).then(request => {
            dispatch({
                type: DELETE_REQUEST,
                data: request,
            });
        }).catch(err => {
            console.log(err);
        })
    };
}
