"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reduce;
var initialStates = {
	status: "idle",
	err: null,
	books: []
};

function reduce() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	switch (action.type) {
		case "FETCH_COLLECTION_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_COLLECTION_FULFILLED":
			return _extends({}, state, {
				status: "succeed",
				books: action.payload.data
			});

		case "FETCH_COLLECTION_REJECTED":
			return _extends({}, state, {
				status: "failed",
				err: action.payload.data
			});

		default:
			return state;
	}
}