import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import cookie from "react-cookie";
import * as actions from "../../actions/app-actions";
import "./event-calendar.css";
import sweetalert from "sweetalert";
import "../../common/styles/sweetalert.css";

class EventCalendar extends Component {
	
	render() {
		
		const { currentEvents } = this.props.stateFromReducer;

		return (
			<div id="event-calendar">
			 <div id="calendar">
				 <div className="time-frames">
					 <span>8:00</span>
					 <span>8:30</span>
					 <span>9:00</span>
					 <span>9:30</span>
					 <span>10:00</span>
					 <span>10:30</span>
					 <span>11:00</span>
					 <span>11:30</span>
					 <span>12:00</span>
					 <span>12:30</span>
					 <span>1:00</span>
					 <span>1:30</span>
					 <span>2:00</span>
					 <span>2:30</span>
					 <span>3:00</span>
					 <span>3:30</span>
					 <span>4:00</span>
					 <span>4:30</span>
					 <span>5:00</span>
				 </div>
				 <div className="events">
				 </div>
			 </div>
			 <div className="buttons">
				 <a href="events.json" download>
					 <button className="dark-blue">Export</button>
				 </a>
				 <button className="red" onClick={this.openDeleteModal}>Delete</button>
				 <button className="green" onClick={this.openAddModal}>Add</button>
				 <button className="white" onClick={this.logout}>Log Out</button>
			 </div>
			 <div id="delete-window" className="modal">
				 <div className="modal-content">
					 <div className="modal-header">
					    <span className="close" onClick={this.closeDeleteModal}>&times;</span>
					    <h2>Delete event</h2>
					  </div>
					  <div className="modal-body">
					     <label htmlFor="events-titles">Select event: </label>
						 <select id="events-titles">
						 {currentEvents.map(function(event) {
		                    return <option key={event._id} value={event._id}>{event.title}</option>;
			              })}
						 </select>
					  </div>
					  <div className="modal-footer">
					    <button className="red" onClick={this.deleteEvent}>Delete</button>
					  </div>
				  </div>
			 </div>
			 <div id="add-window" className="modal">
				 <div className="modal-content">
					 <div className="modal-header">
					    <span className="close" onClick={this.closeAddModal}>&times;</span>
					    <h2>Add event</h2>
					  </div>
					  <form method="POST" id="add-event-form">
						  <div className="modal-body">
						     <label htmlFor="start-time">Start: </label>
						     <input type="number" defaultValue = {0} min={0} step={1} max={540} id="start-time" name="start-time" required/>
							 <label htmlFor="duration-time">Duration: </label>
						     <input type="number" defaultValue = {15} min={15} step={1} max={540} id="duration-time" name="duration-time" required/>
						     <label htmlFor="event-title"  >Title: </label>
						     <input type="text" pattern=".{5,}" title="5 characters minimum" id="event-title" name="event-title" placeholder="" required/>
						  </div>
						  <div className="modal-footer">
						    <button className="green" onClick={this.addEvent}>Add</button>
						  </div>
					  </form>
				  </div>
			 </div>
		 </div>
		);
	}

	closeAddModal() {
		var modal = document.querySelector("#add-window");
		modal.style.display = "none";
	}

	closeDeleteModal() {
		var modal = document.querySelector("#delete-window");
		modal.style.display = "none";
	}

	openAddModal() {
		var modal = document.querySelector("#add-window");
		modal.style.display = "block";
	}
	
	openDeleteModal = () => {

		const { currentEvents } = this.props.stateFromReducer;

		if (currentEvents.length === 0) {
           
            sweetalert({
                 title: "Error!",
                 title: "Don't have any event!",
                 type: "error"
            });

            return;
    	}

		var modal = document.querySelector("#delete-window");
		modal.style.display = "block";
	}

	logout = () => {
	    this.props.logout();
    }

    isCollision(a, b) {

	    if (a.start >= b.start 
	        && a.start < (b.start + b.height) ) 
	            if (a.left >= b.left 
	                && a.left < (b.left + b.width) )
	                    return true;

	    return false;
	}

	isValidEvents(events) {
	    
	    for (let i = 0; i < events.length; i++) {
	        events[i].left = 0;
	        events[i].width = 200;
	        events[i].height = events[i].duration;
	    }

	    for (let i = 0; i < events.length; i++) {
	    	
	    	let counter = 0;

	        for (let j = 0; j < events.length; j++)    
	                if (i != j && this.isCollision(events[i], events[j]))
	                	++counter;

	        if (counter >= 2)
	        	return false;
	    }

	    return true;
	}

	addEvent = (event) => {
 	
    	let form = document.querySelector("#add-event-form");
      
	    if (!form.checkValidity())
	        return;

		event.preventDefault();

		const MAX_TIME = 540;
		let start = parseInt(document.querySelector("#start-time").value);
		let duration = parseInt(document.querySelector("#duration-time").value);

		if (start + duration > 540) {

			sweetalert({
                 title: "Error!",
                 title: "Wrong values!",
                 type: "error"
            });

            return;
		}

		let title = document.querySelector("#event-title").value;
		event = {start: start, duration: duration, title: title};
		
		const { currentEvents } = this.props.stateFromReducer;
		let newEvents = [];
    	
    	for (let i = 0; i < currentEvents.length; i++) {

    		let event = {};
    		event.start = currentEvents[i].start;
    		event.duration = currentEvents[i].duration;
    		event.title = currentEvents[i].title;
    		newEvents.push(event);
    	}
    	
    	newEvents.push(event);

    	if (!this.isValidEvents(newEvents.slice())) {

    		sweetalert({
                 title: "Error!",
                 title: "Not allowed more than 1 collision in row!",
                 type: "error"
            });

            return;
    	}

		const userID = cookie.load("current-user-id");
		
		this.props.addEvent(userID, event, {events: newEvents});
		
    	this.closeAddModal();

	}

    deleteEvent = () => {
    	
    	const { currentEvents } = this.props.stateFromReducer;
    	var eventID = document.querySelector("#events-titles").value;
    	let newEvents = [];
    	
    	for (let i = 0; i < currentEvents.length; i++) {

    		let event = {};
    		event.start = currentEvents[i].start;
    		event.duration = currentEvents[i].duration;
    		event.title = currentEvents[i].title;

    		if (currentEvents[i]._id != eventID)
    			newEvents.push(event);

    	}

    	let body = {};
    	const userID = cookie.load("current-user-id");
    	this.props.deleteEvent(userID, eventID, {events: newEvents});
    	this.closeDeleteModal();
    }

	componentWillMount() {
		
		const userID = cookie.load("current-user-id");

		setTimeout(() => {
			this.props.getEvents(userID);
		}, 100);
	}

	componentDidUpdate() {

		const {currentEvents} = this.props.stateFromReducer;

		let events = [];

		for (let i = 0; i < currentEvents.length; i++) {
			let event = {};
			event.start = currentEvents[i].start;
			event.duration = currentEvents[i].duration;
			event.title = currentEvents[i].title;
			events.push(event);
		}

		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events));
		var link = document.querySelector("a");
		link.setAttribute("href", dataStr);
		link.setAttribute("download", "events.json");

		var eventsBlock = document.querySelector(".events");

		eventsBlock.innerHTML = "";

		const {drawingEvents} = this.props.stateFromReducer;

		for (let i = 0; i < drawingEvents.length; i++) {

			var eventDiv = document.createElement("div");
			eventDiv.classList.add("event");
			eventDiv.innerHTML = "<span class=nowrap>" + drawingEvents[i].title + "</span>";
			eventDiv.style.top = drawingEvents[i].start * 2 + "px";
			eventDiv.style.left = drawingEvents[i].left + "px";
			eventDiv.style.width = drawingEvents[i].width + "px";
			eventDiv.style.height = drawingEvents[i].duration * 2 + "px";

			eventsBlock.appendChild(eventDiv);
		}
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
const  EventCalendarConected = connect(mapStateToProps, mapDispatchToProps)(EventCalendar);
export default  EventCalendarConected;