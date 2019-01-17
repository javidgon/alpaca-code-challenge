import {
    BAD_AUTH_CREDENTIALS,
    FETCH_USER,
    SETTINGS_UPDATED,
    USER_SUCCESSFULLY_LOGGED_IN,
    USER_SUCCESSFULLY_LOGGED_OUT
} from "../constants";

export default function (state = {}, action) {

    switch (action.type) {
        case FETCH_USER:
            return {...state, ...action.payload};
        case SETTINGS_UPDATED:
            return {...state, ['preferred_working_hours_per_day']: action.payload.preferred_working_hours_per_day};
        case USER_SUCCESSFULLY_LOGGED_IN:
            return {...state, ['token']: action.payload.token};
        case USER_SUCCESSFULLY_LOGGED_OUT:
            return {...state, ['token']: null};
        case BAD_AUTH_CREDENTIALS:
            return {...state, ['token']: null};
        default:
            return state;
    }
}