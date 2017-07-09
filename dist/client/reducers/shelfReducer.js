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
		case "ADD_BOOK_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "ADD_BOOK_FULFILLED":
			var books = state.books.splice(0); // clone it
			var _action$payload$data = action.payload.data,
			    bookID = _action$payload$data.bookID,
			    title = _action$payload$data.title,
			    imageurl = _action$payload$data.imageurl;

			books.push({
				bookID: bookID,
				title: title,
				imageurl: imageurl
			});

			return _extends({}, state, {
				status: "succeed",
				books: books
			});

		case "ADD_BOOK_REJECTED":
			return _extends({}, state, {
				err: action.payload.data
			});

		default:
			return state;
	}
}