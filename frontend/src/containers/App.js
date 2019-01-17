import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {connect} from 'react-redux';

import Header from "../components/Header";

import LoginForm from "../containers/LoginForm";
import SignupForm from "../containers/SignupForm";
import LogoutForm from "../containers/LogoutForm";

import {isUserLoggedIn} from "../utils";
import CreateTaskForm from "./CreateTaskForm";
import EditTaskForm from "./EditTaskForm";

import SettingsForm from "./SettingsForm";
import TasksContainer from "./TasksContainer";

export class App extends Component {
    render() {
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                isUserLoggedIn() === true
                    ? <Component {...props} />
                    : <Redirect to='/login/'/>
            )}/>
        );

        return (
            <div className="container">
                <Header isUserLoggedIn={isUserLoggedIn()}/>
                <Switch>
                    <PrivateRoute path='/settings/' component={SettingsForm}/>
                    <PrivateRoute path='/tasks/create/' component={CreateTaskForm}/>
                    <PrivateRoute path='/tasks/:task_id/' component={EditTaskForm}/>
                    <PrivateRoute path='/tasks/' component={TasksContainer}/>
                    <PrivateRoute path='/logout/' component={LogoutForm}/>
                    <Route path='/login/' component={LoginForm}/>
                    <Route path='/signup/' component={SignupForm}/>
                    <Redirect from="/" to="/tasks/"/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(null, null)(App));