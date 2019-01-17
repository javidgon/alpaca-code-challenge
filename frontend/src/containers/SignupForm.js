import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {submitSignupActionCreator} from '../actions';
import qs from 'query-string';
import {renderField} from "../fields";

export class SignupForm extends Component {
    onSubmit(values) {
        const signup = {
            email: values.email,
            username: values.username,
            password: values.password
        };
        const successCallback = (data) => {
            this.props.history.push(`/login/?success=${data}`);
        };
        const failureCallback = (data) => {
            this.props.history.push(`/signup/?error=${data}`);
        };
        this.props.submitSignup(signup, successCallback, failureCallback);
    }

    render() {
        const {handleSubmit} = this.props;
        const params = qs.parse(this.props.location.search);
        const error = params.error;
        return (
            <div>
                {error &&
                <div className="alert alert-danger" role="alert">
                    Error: {error}
                </div>
                }
                <div className='row'>
                    <h2 className='col'>Signup</h2>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <label>Email</label>
                    <Field
                        name='email'
                        type='text'
                        component={renderField}
                    />
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
                    <a href="/" className='btn btn-warning'>Back</a>
                    <button type='submit' className='btn btn-primary btn-submit'>Create Account</button>
                </form>
            </div>
        )
    }
}

export function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Enter an Email';
    }
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
        submitSignup: submitSignupActionCreator
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(reduxForm({
    validate: validate,
    form: 'SignupForm',
})(SignupForm));