import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocalizer from "react-widgets-moment";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createTaskActionCreator} from '../actions';
import qs from 'query-string';
import {renderDateTimeField, renderField} from "../fields";

momentLocalizer(moment);

export class CreateTaskForm extends Component {
    onSubmit(values) {
        const task = {
            name: values.name,
            date: values.date,
            duration: values.duration

        };
        const successCallback = (data) => {
            this.props.history.push(`/tasks/?success=${data}`);
        };
        const failureCallback = (data) => {
            this.props.history.push(`/tasks/create/?error=${data}`);
        };
        this.props.submitTask(task, successCallback, failureCallback);
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
                    <h2 className='col'>Create Task</h2>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <label>Name of the Task</label>
                    <Field
                        name='name'
                        component={renderField}
                    />
                    <label>Date (e.g., 2019-22-01)</label>
                    <Field
                        name="date"
                        showTime={false}
                        component={renderDateTimeField}
                    />
                    <label>Duration (in hours)</label>
                    <Field
                        name='duration'
                        type='text'
                        component={renderField}
                    />
                    <a href="/" className='btn btn-warning'>Back</a>
                    <button type='submit' className='btn btn-primary btn-submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Enter a Name';
    }
    if (!values.date) {
        errors.date = 'Enter a Date';
    }
    if (!values.duration) {
        errors.duration = 'Enter a Duration';
    }

    return errors;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitTask: createTaskActionCreator
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(reduxForm({
    validate: validate,
    form: 'CreateTaskForm',
})(CreateTaskForm));
