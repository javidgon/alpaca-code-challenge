import React, {Component} from 'react';
import _ from 'lodash';
import Title from "./Title";


export default class AggregatedTasks extends Component {
    render() {
        const aggregatedTasks = this.props.tasks;
        if (!_.isEmpty(aggregatedTasks)) {
            return (
                <div>
                    <Title text={'Aggregated Tasks'}/>
                    {Object.keys(aggregatedTasks).map(function (date) {
                        let tasksInDate = aggregatedTasks[date];
                        return (<ul key={date}>
                            <li>
                                <span className="attr-title">
                                    Date:
                                </span>
                                {date}
                            </li>
                            <li>
                                <span className="attr-title">
                                    Total time:
                                </span>
                                {_.reduce(_.map(tasksInDate, 'duration'), (sum, n) => {
                                    return sum + n;
                                }, 0)} Hours
                            </li>
                            <li>
                                <span className="attr-title">
                                    Tasks:
                                </span>
                                <ul>
                                    {tasksInDate.map(function (task, i) {
                                        return <li key={task.name}>{task.name}</li>
                                    })}
                                </ul>
                            </li>
                        </ul>)
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <Title text={'Aggregated Tasks'}/>
                    <p>Sorry, currently you don't have tasks for the selected period of time. You can create some <a
                        href="/tasks/create/">here</a>!</p>
                </div>
            )
        }

    }
}