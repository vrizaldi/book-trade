"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reduce;
var initialStates = {
	status: "idle",
	loggedIn: false,
	error: null,
	userData: {
		username: "",
		fullName: "",
		city: "",
		state: "",
		requests: [],
		requestNotifs: []
	}
};

function reduce() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	switch (action.type) {
		case "LOGIN_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "USER_DATA_RECEIVED":
			var data = action.payload.data;

			return _extends({}, state, {
				loggedIn: true,
				userData: _extends({}, state.userData, {
					username: data.username,
					fullName: data.fullName,
					city: data.city,
					state: data.state
				})
			});

		case "USER_DATA_REJECTED":
			alert(action.payload.response.data ? action.payload.response.data : action.payload);
			return _extends({}, state, {
				status: "failed",
				error: action.payload.data
			});

		case "SIGN_UP_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "SIGN_UP_FULFILLED":
			alert("Signup successful, now you can login!");
			return _extends({}, state, {
				status: "succeed"
			});

		case "SIGN_UP_REJECTED":
			console.log("payload ");
			alert(action.payload.response.data ? action.payload.response.data : action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		case "REQUEST_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "REQUEST_PARSED":
			return _extends({}, state, {
				status: "succeed",
				userData: _extends({}, state.userData, {
					requests: action.payload.data.requests,
					requestNotifs: action.payload.data.requestNotifs
				})
			});

		case "REQUEST_FAILED":
			return _extends({}, state, {
				status: "failed",
				err: action.payload.data
			});

		case "UPDATE_BIO_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "UPDATE_BIO_FULFILLED":
			var _action$payload$data = action.payload.data,
			    fullName = _action$payload$data.fullName,
			    city = _action$payload$data.city;

			return _extends({}, state, {
				status: "succeed",
				userData: _extends({}, state.userData, {
					fullName: fullName,
					city: city,
					state: action.payload.data.state
				})
			});

		case "UPDATE_BIO_REJECTED":
			alert(action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		default:
			return state;
	}
}