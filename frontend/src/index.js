import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk'

import ReduxPromise from 'redux-promise';

import reducers from './reducers';

import App from "./containers/App";
import {BrowserRouter} from "react-router-dom";
import {fetchUserActionCreator} from "./actions";
import {isUserLoggedIn} from "./utils";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, ReduxPromise)(createStore);

const store = createStoreWithMiddleware(reducers);

if (isUserLoggedIn()) {
    store.dispatch(fetchUserActionCreator());
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#app'));