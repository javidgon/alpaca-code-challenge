import axios from 'axios';
import {
    BAD_AUTH_CREDENTIALS,
    BASE_URL,
    FETCH_TASKS,
    FETCH_USER,
    SETTINGS_UPDATED,
    TASK_DELETED,
    TASK_SUCCESSFULLY_CREATED,
    TASK_SUCCESSFULLY_UPDATED,
    USER_SUCCESSFULLY_LOGGED_IN,
    USER_SUCCESSFULLY_LOGGED_OUT
} from '../constants';
import {getHeaders, removeAuthToken, setAuthToken} from "../utils";

// User
export function fetchUserActionCreator() {
    return dispatch => axios.get(`${BASE_URL}/users/account/`, getHeaders()).then(
        (response) => {
            dispatch({
                type: FETCH_USER,
                payload: response.data
            });
        }).catch(() => {
        console.log('You need to log in first.')
    })
}

export function submitLoginActionCreator(login, successCallback, failureCallback) {
    return dispatch => axios.post(`${BASE_URL}/api-token-auth/`, {
        'username': login.username,
        'password': login.password
    }).then((response) => {
        setAuthToken(response.data.token);
        successCallback(response.data);
        dispatch({
            type: USER_SUCCESSFULLY_LOGGED_IN,
            payload: response.data
        });
    }).catch((response) => {
        failureCallback(response.data);
        dispatch({
            type: BAD_AUTH_CREDENTIALS,
            payload: response.data
        });
    });
}

export function submitLogoutActionCreator(callback) {
    return dispatch => {
        removeAuthToken();
        callback();
        dispatch({
            type: USER_SUCCESSFULLY_LOGGED_OUT
        });
    };
}


export function submitSignupActionCreator(signup, successCallback, failureCallback) {
    return dispatch => axios.post(`${BASE_URL}/users/`, {
        'email': signup.email,
        'username': signup.username,
        'password': signup.password
    }).then((response) => {
        successCallback('Your Account has been created!');
    }).catch((response) => {
        let username = _.get(response.response.data, 'username', '');
        let email = _.get(response.response.data, 'email', '');
        let password = _.get(response.response.data, 'password', '');
        failureCallback(`${username} ${email} ${password}`);
    });
}

// Task

export function fetchTasksActionCreator() {
    return {
        type: FETCH_TASKS,
        payload: axios.get(`${BASE_URL}/tasks/`, getHeaders())
    }
}

export function deleteTaskActionCreator(task, successCallback, failureCallback) {
    return dispatch => axios.delete(`${BASE_URL}/tasks/${task.id}/`, getHeaders()).then(
        (response) => {
            dispatch({
                type: TASK_DELETED,
                payload: task
            });
        })
}

export function createTaskActionCreator(task, successCallback, failureCallback) {
    return dispatch => axios.post(`${BASE_URL}/tasks/`, {
        'name': task.name,
        'date': task.date.toISOString().slice(0, 10),
        'duration': task.duration
    }, getHeaders()).then((response) => {
        successCallback('Task has been created!');
        dispatch({
            type: TASK_SUCCESSFULLY_CREATED,
            payload: response.data
        });
    }).catch((response) => {
        let name = _.get(response.response.data, 'name', '');
        let date = _.get(response.response.data, 'date', '');
        let duration = _.get(response.response.data, 'duration', '');
        failureCallback(`${name} ${date} ${duration}`);
    });
}

export function editTaskActionCreator(task, successCallback, failureCallback) {
    return dispatch => axios.put(`${BASE_URL}/tasks/${task.id}/`, {
        'name': task.name,
        'date': (task.date instanceof Date) ? task.date.toISOString().slice(0, 10) : task.date,
        'duration': task.duration
    }, getHeaders()).then((response) => {
        successCallback('Task updated!');
        dispatch({
            type: TASK_SUCCESSFULLY_UPDATED,
            payload: response.data
        });
    }).catch((response) => {
        let name = _.get(response.response.data, 'name', '');
        let date = _.get(response.response.data, 'date', '');
        let duration = _.get(response.response.data, 'duration', '');
        failureCallback(task, `${name} ${date} ${duration}`);
    });
}

// Settings

export function editSettingsActionCreator(settings, successCallback, failureCallback) {
    return dispatch => axios.patch(`${BASE_URL}/users/account/`, {
        'preferred_working_hours_per_day': settings.preferredWorkingHoursPerDay,
    }, getHeaders()).then((response) => {
        successCallback('Settings updated!');
        dispatch({
            type: SETTINGS_UPDATED,
            payload: response.data
        });
    }).catch((response) => {
        let preferredWorkingHoursPerDay = _.get(response.response.data, 'preferred_working_hours_per_day', '');
        failureCallback(settings, `${preferredWorkingHoursPerDay}`);
    });
}
