import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {submitLoginActionCreator} from '../actions';
import qs from 'query-string';
import {renderField} from "../fields";

export class LoginForm extends Component {
    onSubmit(values) {
        const login = {
            username: values.username,
            password: values.password
        };
        const successCallback = (data) => {
            this.props.history.push('/');
        };
        const failureCallback = (data) => {
            this.props.history.push('/login/?error=invalid_credentials');
        };
        this.props.submitLogin(login, successCallback, failureCallback);
    }

    render() {
        const {handleSubmit} = this.props;
        const params = qs.parse(this.props.location.search);
        const error = params.error;
        const success = params.success;
        return (
            <div>
                {error &&
                <div className="alert alert-danger" role="alert">
                    Error: {error}
                </div>
                }
                {success &&
                <div className="alert alert-success" role="alert">
                    Success: {success}
                </div>
                }
                <div className='row'>
                    <h2 className='col'>Login</h2>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <label>Username</label>
                    <Field
                        name='username'
                        type='text'
                        component={renderField}
                    />
                    <label>Password</label>
                    <Field
                        name='password'
                        type='password'
                        component={renderField}
                    />
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
                <p>Don't you have an account yet? <a href="/signup/">Create one!</a></p>
            </div>
        )
    }
}

export function validate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = 'Enter a Username';
    }
    if (!values.password) {
        errors.password = 'Enter a Password';
    }

    return errors;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogin: submitLoginActionCreator
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(reduxForm({
    validate: validate,
    form: 'LoginForm',
})(LoginForm));