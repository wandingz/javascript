import Cookies from 'universal-cookie';

import { loading, LOADING_PENDING, LOADING_ERROR, LOADING_FINISHED } from './loading.js';

const cookies = new Cookies();

export const ERROR = "ERROR";
export const USER_LOGIN = "USER_LOGIN";

// export function updateState(form) {
//     return function (dispatch) {
//         dispatch({
//             type: 'UPDATE_STATE',
//             form
//         })
//         return Promise.resolve()
//     }
// }

export function login(form) {
    return (dispatch) => {
        // var promise = Promise();
        // dispatch(loading('Login', LOADING_PENDING));
        var promise = fetch('http://localhost:4000/authenticate', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
        }).then(d => d.json()).then(data => {
            if (data.isLoggedIn) {
                cookies.set('user', data, { path: '/' });
                cookies.set('authorization', data.token, { path: '/' });
                dispatch({
                    type: USER_LOGIN,
                    data: data,
                });
                // dispatch(loading('Login', LOADING_FINISHED));
                // dispatch(loading('Login', undefined));
            } else {
                throw (data);
            }
        }).catch(err => {
            console.log(err);
            // dispatch(loading('Login', LOADING_ERROR));
        });
        return promise;
    };
}

export function register(form) {
    return (dispatch) => {
        dispatch(loading('Register', LOADING_PENDING));
        fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
        }).then(d => d.json()).then(data => {
            if (data.isLoggedIn) {
                cookies.set('user', data, { path: '/' });
                cookies.set('authorization', data.token, { path: '/' });
                dispatch({
                    type: USER_LOGIN,
                    data: data,
                });
                dispatch(loading('Register', LOADING_FINISHED));
                dispatch(loading('Register', undefined));
            } else {
                throw (data);
            }
        }).catch(err => {
            console.log(err);
            dispatch(loading('Register', LOADING_ERROR));
        });
    }
}

export function logout() {
    // fetch('http://localhost:4000/logout', {
    cookies.remove('user', { path: '/' });
    cookies.remove('authorization', { path: '/' });
    return {
        type: USER_LOGIN,
        data: {
            isLoggedIn: false,
        },
    };
}