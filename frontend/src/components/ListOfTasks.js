import React, {Component} from 'react';
import _ from 'lodash';
import TaskRow from './TaskRow';
import Title from './Title';
import {getNumHoursPerDate} from "../utils";


export default class ListOfTasks extends Component {
    renderTasks(tasks) {
        const numHoursPerDate = getNumHoursPerDate(tasks);

        return tasks.map(taskObj => {
            return <TaskRow key={taskObj.id} task={taskObj}
                            isOvertime={numHoursPerDate[taskObj.date] > this.props.user.preferred_working_hours_per_day}
                            deleteTask={this.props.deleteTask}/>
        })
    }

    render() {
        const tasks = this.props.tasks;
        let el;
        if (tasks.length > 0) {
            el = (
                <div>
                    <Title text={'List of Tasks'}/>
                    <ul className='list-group'>
                        {this.renderTasks(tasks)}
                    </ul>
                </div>
            );
        } else {
            el = (
                <div>
                    <Title text={'Tasks'}/>
                    <p>Sorry, currently you don't have tasks for the selected period of time. You can create some <a
                        href="/tasks/create/">here</a>!</p>
                </div>
            )
        }
        return el
    }
}