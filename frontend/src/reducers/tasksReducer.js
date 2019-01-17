import _ from 'lodash';
import {FETCH_TASKS, TASK_DELETED, TASK_SUCCESSFULLY_CREATED, TASK_SUCCESSFULLY_UPDATED} from "../constants";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_TASKS:
            return _.mapKeys(action.payload.data, (value) => value.id);
        case TASK_SUCCESSFULLY_CREATED:
            return {...state, [action.payload.id]: action.payload};
        case TASK_SUCCESSFULLY_UPDATED:
            return {...state, [action.payload.id]: action.payload};
        case TASK_DELETED:
            return _.omit(state, action.payload.id);
        default:
            return state;
    }
}