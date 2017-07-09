"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.login = login;
exports.signup = signup;
exports.request = request;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function login(username, password) {
	return {
		type: "LOGIN",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/login",
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
	return {
		type: "REQUEST",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/request",
			data: {
				username: username,
				bookID: bookID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}