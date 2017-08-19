import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/app-actions";
import LoginPage from "./login-page/login-page.js";
import EventCalendar from "./event-calendar/event-calendar";
import cookie from "react-cookie";

class EventCalendarApp extends Component {
	
	render() {

		const username = cookie.load("current-username");
		const { logged } = this.props.stateFromReducer;
	 	 
	 	if (!logged && !username)
	 	   return (<LoginPage/>);

	 	return (<EventCalendar />);

	}

	componentDidMount() {
		this.props.getAllUsersRequest();

	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}

const  EventCalendarAppConected = connect(mapStateToProps, mapDispatchToProps)(EventCalendarApp);
export default  EventCalendarAppConected;