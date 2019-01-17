import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    renderBtn(isUserLoggedIn) {
        if (isUserLoggedIn) {
            return <Link to={'/logout/'} className="float-right">Log out</Link>
        } else {
            return <Link to={'/login/'} className="float-right">Log in</Link>
        }
    }

    render() {
        const {isUserLoggedIn} = this.props;
        return (
            <nav id="primary-nav" className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'} className="navbar-brand">Alpaca</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {isUserLoggedIn &&
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={'/tasks/'}>
                                <div>Tasks</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/tasks/create/'}>
                                <div>Create Task</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/settings/'}>
                                <div>Settings</div>
                            </Link>
                        </li>
                    </ul>
                    }
                </div>
                {this.renderBtn(isUserLoggedIn)}
            </nav>
        )
    }
}