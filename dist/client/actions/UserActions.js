"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.login = login;
exports.signup = signup;
exports.request = request;
exports.cancelRequest = cancelRequest;
exports.updateBio = updateBio;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login(username, password) {
	return function (dispatch) {
		dispatch({
			type: "LOGIN_PENDING"
		});

		// basic login
		(0, _axios2.default)({
			method: "post",
			url: "/login",
			data: {
				username: username,
				password: password
			},
			headers: {
				"content-type": "application/json"
			}
		}).then(function (res) {
			console.log("res", res);
			// acquired user data
			dispatch({
				type: "USER_DATA_RECEIVED",
				payload: res
			});

			// parse the requests
			parseRequests(dispatch, res.data.requests, res.data.requestNotifs);
		}).catch(function (err) {
			console.log("err", err);
			dispatch({
				type: "USER_DATA_REJECTED",
				payload: err
			});
		});
	};
}

function signup(username, password) {
	return {
		type: "SIGN_UP",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/signup",
			data: {
				username: username,
				password: password
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

function request(username, bookID) {

	return function (dispatch) {
		dispatch({
			type: "REQUEST_PENDING"
		});

		(0, _axios2.default)({
			method: "post",
			url: "/request",
			data: {
				username: username,
				bookID: bookID
			},
			headers: {
				"content-type": "application/json"
			}
		}).then(function (res) {
			// parse the requests
			parseRequests(dispatch, res.data.requests, res.data.requestNotifs);
		});
	};
}

function cancelRequest(username, requestID) {
	return function (dispatch) {
		dispatch({
			type: "REQUEST_PENDING"
		});

		(0, _axios2.default)({
			method: "post",
			url: "/cancel_request",
			data: {
				username: username,
				requestID: requestID
			},
			headers: {
				"content-type": "application/json"
			}
		}).then(function (res) {
			// parse the requests
			parseRequests(dispatch, res.data.requests, res.data.requestNotifs);
		});
	};
}

function parseRequests(dispatch, requests, requestNotifs) {

	console.log("parsing request...");
	(0, _axios2.default)({
		method: "post",
		url: "/parse_request",
		data: {
			requests: requests,
			requestNotifs: requestNotifs
		}
	}).then(function (res) {
		console.log("request res", res);
		dispatch({
			type: "REQUEST_PARSED",
			payload: res
		});
	}).catch(function (err) {
		dispatch({
			type: "REQUEST_FAILED",
			payload: err
		});
	});
}

function updateBio(username, fullName, city, state) {
	return {
		type: "UPDATE_BIO",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/update_bio",
			data: {
				username: username,
				fullName: fullName,
				city: city,
				state: state
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}