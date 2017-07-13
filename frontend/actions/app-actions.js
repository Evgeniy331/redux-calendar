import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGIN_REQUEST_ERROR = "LOGIN_REQUEST_ERROR";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESSFUL = "LOGOUT_SUCCESSFUL";
export const LOGOUT_REQUEST_ERROR = "LOGOUT_REQUEST_ERROR";
export const GET_ALL_USERS_REQUEST = "GET_ALL_USERS_REQUEST";
export const RECEIVED_ALL_USERS = "RECEIVED_ALL_USERS";
export const GET_ALL_USERS_REQUEST_ERROR = "GET_ALL_USERS_REQUEST_ERROR";
export const WRONG_PASSWORD_MESSAGE_WAS_DISPLAYED = "WRONG_PASSWORD_MESSAGE_WAS_DISPLAYED";
export const DELETE_EVENT_REQUEST = "DELETE_EVENT_REQUEST";
export const EVENT_WAS_DELETED = "EVENT_WAS_DELETED ";
export const DELETE_EVENT_REQUEST_ERROR = "DELETE_EVENT_REQUEST_ERROR";
export const ADD_EVENT_REQUEST = "ADD_EVENT_REQUEST";
export const EVENT_WAS_ADDED = "EVENT_WAS_ADDED";
export const ADD_EVENT_REQUEST_ERROR = "ADD_EVENT_REQUEST_ERROR";
export const GET_EVENTS = "GET_EVENTS";

export function addEvent(userID, event, body) {

	return (dispatch, getStore) => {

		dispatch({ type: ADD_EVENT_REQUEST });

		return axios.put("/api/users/" + userID, body)
		.then(response => {
			dispatch(eventWasAdded(event, userID));
		})
		.catch(response => {
			dispatch(updateUserRequestError(response.data));
		});
	};
}

export function eventWasAdded(event, userID) {
	return {
		type: EVENT_WAS_ADDED,
		event,
		userID
	};
}

export function addEventError(data) {
	return {
		type: ADD_EVENT_REQUEST_ERROR,
		data
	};
}

export function deleteEvent(userID, eventID, body) {

	return (dispatch, getStore) => {

		dispatch({ type: DELETE_EVENT_REQUEST });

		return axios.put("/api/users/" + userID, body)
		.then(response => {
			dispatch(eventWasDeleted(eventID, userID));
		})
		.catch(response => {
			dispatch(deleteEventError(response.data));
		});
	};
}

export function eventWasDeleted(eventID, userID) {
	return {
		type: EVENT_WAS_DELETED,
		eventID,
		userID
	};
}

export function deleteEventError(data) {
	return {
		type: DELETE_EVENT_REQUEST_ERROR,
		data
	};
}

export function getEvents(userID) {
	return {
		type: "GET_EVENTS",
		userID
	};
}


export function wrongPasswordMessageWasDispalyed() {
	return {
		type: "WRONG_PASSWORD_MESSAGE_WAS_DISPLAYED"
	};
}

export function getAllUsersRequest() {

	return (dispatch, getStore) => {

		dispatch({ type: GET_ALL_USERS_REQUEST });

		return axios.get("/api/users/")
		.then(response => {
			dispatch(receivedAllUsers(response.data));
		})
		.catch(response => {
			dispatch(getAllUsersRequestError(response.data));
		});
	};
}

export function receivedAllUsers(data) {
	return {
		type: RECEIVED_ALL_USERS,
		data
	};
}

export function getAllUsersRequestError(data) {
	return {
		type: GET_ALL_USERS_REQUEST_ERROR,
		data
	};
}

export function logout() {

	return (dispatch, getStore) => {

		dispatch({ type: LOGOUT_REQUEST });

		return axios.get("/api/logout")
		.then(response => {
			dispatch(logoutSuccesful(response.data));
		})
		.catch(response => {
			dispatch(logoutError(response.data));
		});
	};
}

export function logoutSuccesful(data) {
	return {
		type: LOGOUT_SUCCESSFUL,
		data
	};
}

export function logoutError(data) {
	return {
		type: LOGOUT_REQUEST_ERROR,
		data
	};
}

export function login(reqBody) {

	return (dispatch, getStore) => {

		dispatch({ type: LOGIN_REQUEST });

		return axios.post("/api/login", reqBody)
		.then(response => {
			dispatch(loginSuccesful(response.data));
		})
		.catch(response => {
			dispatch(loginError(response.data));
		});
	};
}

export function loginSuccesful(data) {
	return {
		type: LOGIN_SUCCESSFUL,
		data
	};
}

export function loginError(data) {
	return {
		type: LOGIN_REQUEST_ERROR,
		data
	};
}
