import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import qs from 'query-string';
import {editSettingsActionCreator, fetchUserActionCreator} from "../actions";
import {renderField} from "../fields";


export class SettingsForm extends Component {
    componentWillMount() {
        this.props.fetchUser();
    }

    onSubmit(values) {
        const settings = {
            preferredWorkingHoursPerDay: values.preferredWorkingHoursPerDay
        };
        const successCallback = (data) => {
            this.props.history.push(`/tasks/?success=${data}`);
        };
        const failureCallback = (data) => {
            this.props.history.push(`/settings/?error=${data}`);
        };
        this.props.submitSettings(settings, successCallback, failureCallback);
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
                    <h2 className='col'>Settings</h2>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <label>Preferred Working Hours per Day (By default is 8 Hours)</label>
                    <Field
                        name='preferredWorkingHoursPerDay'
                        component={renderField}
                    />

                    <a href="/" className='btn btn-warning'>Back</a>
                    <button type='submit' className='btn btn-primary btn-submit'>Save</button>
                </form>
            </div>
        )
    }
}

export function validate(values) {
    const errors = {};

    if (!values.preferredWorkingHoursPerDay) {
        errors.name = 'Enter a valid "Preferred Working Hours per Day"';
    }

    return errors;
}

function mapStateToProps(state) {
    const user = state.user;
    return {
        user: user,
        initialValues: {
            'preferredWorkingHoursPerDay': user ? user.preferred_working_hours_per_day : null,
        }
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUser: fetchUserActionCreator,
        submitSettings: editSettingsActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    validate: validate,
    form: 'SettingsForm',
    enableReinitialize: true,
})(SettingsForm));
