import { REMOVE_USER, ADD_USER, GET_USER, LOADING, USER_LOGIN } from "../actions/user";

var initAppState = {
    user: {},
    users: [],
    loading_states: {},
};

function deepcopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default function userReducer(state = initAppState, action) {
    state = deepcopy(state);
    switch (action.type) {
        case REMOVE_USER:
            return state.filter(u => u.username != action.user.username);
        case ADD_USER:
            return action.callback(state, action.user);
        case GET_USER:
            return action.data;

        case LOADING:
            state.loading_states[action.target] = action.status;
            return state;
        case USER_LOGIN:
            state.user = action.data;
            return state;

        default:
            return state;
    }
}