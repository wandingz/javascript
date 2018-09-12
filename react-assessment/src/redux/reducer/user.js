import Cookies from 'universal-cookie';

import { USER_LOGIN } from "../actions/user";
import { LOADING } from '../actions/loading';
import { GET_REQUESTS, DELETE_REQUEST, UPDATE_REQUEST } from '../actions/request';

const cookies = new Cookies();

var initAppState = {
    user: cookies.get('user', { path: '/' }) || {},
    requests: [],
    loading_states: {},
};

function deepcopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default function userReducer(state = initAppState, action) {
    state = deepcopy(state);
    switch (action.type) {
        case LOADING:
            state.loading_states[action.target] = action.status;
            return state;
        case USER_LOGIN:
            state.user = action.data;
            return state;

        case GET_REQUESTS:
            state.requests = action.data;
            return state;
        case DELETE_REQUEST:
            state.requests = state.requests.filter(r => r.id !== action.data.id);
            return state;
        case UPDATE_REQUEST:
            var index = state.requests.findIndex(r => r.id === action.data.id);
            state.requests[index] = action.data;
            return state;

        default:
            return state;
    }
}