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
		state: ""
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

		case "LOGIN_FULFILLED":
			var data = action.payload.data;

			return _extends({}, state, {
				status: "succeed",
				userData: _extends({}, state.userData, {
					username: data.username,
					fullName: data.fullName,
					city: data.city,
					state: data.state
				})
			});

		case "LOGIN_REJECTED":
			return _extends({}, state, {
				status: "failed",
				error: action.payload.data
			});

		case "SIGNUP_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "SIGNUP_FULFILLED":
			return _extends({}, state, {
				status: "succeed"
			});

		case "SIGNUP_REJECTED":
			return _extends({}, state, {
				status: "failed"
			});

		default:
			return state;
	}
}