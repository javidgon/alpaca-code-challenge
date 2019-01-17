import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {submitLogoutActionCreator} from "../actions/index";
import {connect} from 'react-redux';

export class LogoutForm extends Component {

    componentDidMount() {
        const callback = () => {
            this.props.history.push('/login/');
        };
        this.props.submitLogout(callback);
    }

    render() {
        return null
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogout: submitLogoutActionCreator
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LogoutForm);
