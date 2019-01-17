import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment'
import momentLocalizer from "react-widgets-moment";

import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {deleteTaskActionCreator, fetchTasksActionCreator} from "../actions";
import ListOfTasks from "../components/ListOfTasks";
import qs from "query-string";
import {Field, reduxForm} from "redux-form";
import AggregatedTasks from "../components/AggregatedTasks";
import {renderDateTimeField} from "../fields";
import {aggregateTaskByDate, selectTasksWithinDateRange} from "../utils";

momentLocalizer(moment);

export class TasksContainer extends Component {
    componentWillMount() {
        this.props.fetchTasks();
    }

    onSubmit(values) {
        // If there's a filter selected, we prepare the URL to be able to filter.
        if (values.from && values.to) {
            const from = values.from.toISOString().slice(0, 10);
            const to = values.to.toISOString().slice(0, 10);
            let url = `/tasks/?from=${from}&to=${to}&success=Selected tasks from "${from}" to "${to}"`;

            if (values.mode === 'aggregate') {
                url += '&aggregate=true'
            }

            this.props.history.push(url);
        } else {
            this.props.history.push('/tasks/?error=Please select first a range of dates');
        }
    }

    render() {
        const {handleSubmit} = this.props;
        const params = qs.parse(this.props.location.search);
        const success = params.success;
        const error = params.error;

        let selectedTasks = this.props.tasks;

        if (params.from && params.to) {
            selectedTasks = selectTasksWithinDateRange(this.props.tasks, params.from, params.to)
        }

        const shouldAggregate = !!params.aggregate;
        let aggregatedTasks = {};

        if (shouldAggregate) {
            aggregatedTasks = aggregateTaskByDate(selectedTasks);
        }

        return (
            <div>
                {success &&
                <div className="alert alert-success" role="alert">
                    Success: {success}
                </div>
                }
                {error &&
                <div className="alert alert-danger" role="alert">
                    Error: {error}
                </div>
                }
                <br/>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <label>From</label>
                    <Field
                        name="from"
                        showTime={false}
                        component={renderDateTimeField}
                    />
                    <label>To</label>
                    <Field
                        name="to"
                        showTime={false}
                        component={renderDateTimeField}
                    />
                    <a href="/" className='btn btn-warning'>Reset</a>


                    <button type='submit' className='btn btn-primary btn-submit' onClick={handleSubmit(values =>
                        this.onSubmit({
                            ...values,
                            mode: 'filter'
                        }))}>Filter
                    </button>
                    <button type='submit' className='btn btn-primary btn-submit' onClick={handleSubmit(values =>
                        this.onSubmit({
                            ...values,
                            mode: 'aggregate'
                        }))}>Aggregate
                    </button>
                </form>
                <br/>
                {shouldAggregate && params.from && params.to &&
                <AggregatedTasks tasks={aggregatedTasks} from={params.from} to={params.to}/>
                }
                {!shouldAggregate &&
                <ListOfTasks tasks={selectedTasks} user={this.props.user} deleteTask={this.props.deleteTask}
                             fetchTasks={this.props.fetchTasks}/>
                }
            </div>
        )
    }
}

export function validate(values) {
    const errors = {};

    if (!values.from) {
        errors.name = 'Enter a "From" Date';
    }
    if (!values.to) {
        errors.date = 'Enter a "To" Date';
    }

    return errors;
}

function mapStateToProps(state, ownProps) {
    const params = qs.parse(ownProps.location.search);
    const from = params.from;
    const to = params.to;
    return {
        tasks: _.values(state.tasks),
        user: state.user,
        initialValues: {
            'from': from ? new Date(from) : null,
            'to': to ? new Date(to) : null,
        }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchTasks: fetchTasksActionCreator,
        deleteTask: deleteTaskActionCreator,
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    validate: validate,
    form: 'TasksContainer',
    enableReinitialize: true
})(TasksContainer));
