import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import moment from 'moment'
import momentLocalizer from "react-widgets-moment";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editTaskActionCreator, fetchTasksActionCreator} from '../actions';
import qs from 'query-string';
import {renderDateTimeField, renderField} from "../fields";

momentLocalizer(moment);

export class EditTaskForm extends Component {
    componentWillMount() {
        this.props.fetchTasks();
    }

    onSubmit(values) {
        const task = {
            id: this.props.task.id,
            name: values.name,
            date: values.date,
            duration: values.duration
        };
        const successCallback = (data) => {
            this.props.history.push(`/tasks/?success=${data}`);
        };
        const failureCallback = (task, data) => {
            this.props.history.push(`/tasks/${task.id}/?error=${data}`);
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
                    <h2 className='col'>Edit Task (ID: {this.props.task ? this.props.task.id : null})</h2>
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
                        label='duration'
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

function mapStateToProps(state, ownProps) {
    const taskId = ownProps.match.params.task_id;
    const task = state.tasks[taskId];
    return {
        task: task,
        initialValues: {
            'name': task ? task.name : null,
            'date': task ? task.date : null,
            'duration': task ? task.duration : null
        }
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchTasks: fetchTasksActionCreator,
        submitTask: editTaskActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    validate: validate,
    form: 'EditTaskForm',
    enableReinitialize: true
})(EditTaskForm));
