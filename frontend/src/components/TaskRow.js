import React, {Component} from 'react';

export default class TaskRow extends Component {
    render() {
        const task = this.props.task;
        const editUrl = `/tasks/${task.id}/`;
        const className = `task-row ${this.props.isOvertime ? 'outside-hours' : 'within-hours'}`;

        return (
            <li className={className}>
                <span>
                    <span className="attr-title">
                        Name:
                    </span>
                    <span className="attr-value">
                        {task.name}
                    </span>
                </span>
                <span>
                    <span className="attr-title">
                        Duration:
                    </span>
                    <span className="attr-value">
                        {task.duration} Hours
                    </span>
                </span>
                <span>
                    <span className="attr-title">
                        Day:
                    </span>
                    <span className="attr-value">
                        {task.date}
                    </span>
                </span>
                <button type="button" className="btn btn-danger right-btn"
                        onClick={this.props.deleteTask.bind(null, task)}>Delete
                </button>
                <a href={editUrl} className="btn btn-primary right-btn">Edit</a>
            </li>
        )
    }
}
