import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import tasksReducer from "./tasksReducer";
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    user: userReducer,
    tasks: tasksReducer,
    form: formReducer
});

export default rootReducer;