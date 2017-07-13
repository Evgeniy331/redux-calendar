import {
	LOGIN_SUCCESSFUL,
    LOGIN_REQUEST_ERROR,
    LOGOUT_SUCCESSFUL,
    LOGOUT_REQUEST_ERROR,
    RECEIVED_ALL_USERS,
    GET_ALL_USERS_REQUEST_ERROR,
    WRONG_PASSWORD_MESSAGE_WAS_DISPLAYED,
    GET_EVENTS,
    EVENT_WAS_DELETED,
    DELETE_EVENT_REQUEST_ERROR,
    EVENT_WAS_ADDED,
    ADD_EVENT_REQUEST_ERROR

} from "../actions/app-actions";

const initialState = {
	logged: false,
    wrongPasswordEntered: false,
    users: [],
    currentEvents: [],
    drawingEvents: []
};

export default function appReducer(state = initialState, action) {
    
    switch (action.type) { 

        case EVENT_WAS_ADDED: {

            const {event} = action;
            const {userID} = action;

            let currentEvents = state.currentEvents.slice();
            event._id = currentEvents.length + 1;
            currentEvents.push(event);

            let drawingEvents = calculateSizes(currentEvents.slice());
            let users = state.users;

            for (let i = 0; i < users.length; i++) {
                if (users[i]._id == userID)
                    users[i].events.push(event);
            }

            return Object.assign({}, state, {
                users,
                currentEvents,
                drawingEvents
            })
        }

        case EVENT_WAS_DELETED: {

            const {eventID} = action;
            const {userID} = action;

            let currentEvents = state.currentEvents.slice();

            for (let i = 0; i < currentEvents.length; i++) 
                if (currentEvents[i]._id == eventID)
                    currentEvents.splice(i, 1);

            let drawingEvents = calculateSizes(currentEvents.slice());

            let users = state.users;

            for (let i = 0; i < users.length; i++) {
                if (users[i]._id == userID)
                    users[i].events = currentEvents;
            }

            return Object.assign({}, state, {
                users,
                currentEvents,
                drawingEvents
            })
        }

        case GET_EVENTS: {

            const {userID} = action;

            let currentEvents = [];

            for (let i = 0; i < state.users.length; i++) 
                if (state.users[i]._id === userID)
                    currentEvents = state.users[i].events.slice();

            let drawingEvents = calculateSizes(currentEvents.slice());

            return Object.assign({}, state, {
                currentEvents,
                drawingEvents
            })
        }

        case WRONG_PASSWORD_MESSAGE_WAS_DISPLAYED: {

           return Object.assign({}, state, {
                wrongPasswordEntered: false
            })
        }

        case RECEIVED_ALL_USERS: {

            const {data} = action;
            
            return Object.assign({}, state, {
                users: data
            })
        }

        case LOGOUT_SUCCESSFUL: {

            const {data} = action;

            let logged = true;

            if (data.success)
                logged = false;
            
            return Object.assign({}, state, {
                logged: logged
            })
        }

        case LOGIN_SUCCESSFUL: {

            const {data} = action;

            let logged = false;
            let wrongPasswordEntered = false;

            if (data.success)
                logged = true;
            else
                wrongPasswordEntered = true;
            
            return Object.assign({}, state, {
                logged: logged,
                wrongPasswordEntered: wrongPasswordEntered
            })
        } 

        case ADD_EVENT_REQUEST_ERROR: {
            
            console.log(ADD_EVENT_REQUEST_ERROR);

            return state;
        }

        case DELETE_EVENT_REQUEST_ERROR: {
            
            console.log(DELETE_EVENT_REQUEST_ERROR);

            return state;
        }

        case GET_ALL_USERS_REQUEST_ERROR: {

            console.log(GET_ALL_USERS_REQUEST_ERROR);

            return state;
        }  

        case LOGOUT_REQUEST_ERROR: {

            console.log(LOGOUT_REQUEST_ERROR);

            return state;
        }

        case LOGIN_REQUEST_ERROR: {

            console.log(LOGIN_REQUEST_ERROR);

            return state;
        }

        default: {
            return state;        
        }
    }
}

function isCollision(a, b) {

    if (a.start >= b.start 
        && a.start < (b.start + b.height) ) 
            if (a.left >= b.left 
                && a.left < (b.left + b.width) )
                    return true;

    return false;
}

function calculateSizes(events) {
    
    for (let i = 0; i < events.length; i++) {
        events[i].left = 0;
        events[i].width = 200;
        events[i].height = events[i].duration;
    }

    for (let i = 0; i < events.length; i++) {
        
        for (let j = 0; j < events.length; j++) {
                    
                if (i != j && isCollision(events[i], events[j])) {
                            
                    if (events[i].width === events[j].width) {
                        events[i].width /= 2;
                        events[j].width /= 2;
                    }
                    else {
                        events[i].width = Math.min(events[i].width, events[j].width);
                        events[j].width = events[i].width;
                    }

                    if (events[i].left === events[j].left)
                        events[j].left = events[i].width;
                }
        }

    }

    for (let i = 0; i < events.length; i++) {

        for (let j = 0; j < events.length; j++) 
            if (i != j && isCollision(events[i], events[j])) {
                
                var randValue = Math.floor(Math.random() * 2);

                if (randValue === 1) {
                    events[i].left = 0;
                    events[j].left = events[i].width;
                }
                else {
                    events[i].left = events[j].width;
                    events[j].left = 0;
                }

                i = 0;
                break;
            }
    }

    return events;

}