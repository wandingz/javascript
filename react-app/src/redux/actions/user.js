export const REMOVE_USER = 'REMOVE_USER';
export const ADD_USER = "ADD_USER";
export const GET_USER = "GET_USER";

export const DEFAULT = "DEFAULT";
export const ERROR = "ERROR";
export const LOADING = "LOADING";
export const USER_LOGIN = "USER_LOGIN";

export function removeUser(user) {
    return {
        type: REMOVE_USER,
        user: user,
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user: user,
        callback: function (state, user) {
            state.push(user);
            return state;
        },
    }
}

export function getUsers() {
    return (dispatch) => {
        fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: GET_USER,
                    data: data,
                });
            });
    }
}

export function register(form) {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            status: 'WAITING',
            target: 'register',
        });
        fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
        }).then(data => {
            dispatch({
                type: LOADING,
                status: 'FINISHED',
                target: 'register',
            });

            if (data.isLoggedIn) {
                dispatch({
                    type: USER_LOGIN,
                    data: data,
                });
            } else {
                throw (data);
            }
        }).catch(err => {
            console.log(err);
            dispatch({
                type: LOADING,
                status: 'ERROR',
                target: 'register',
                error: err,
            })
        });
    }
}