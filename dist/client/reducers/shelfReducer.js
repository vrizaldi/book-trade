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
			    _id = _action$payload$data._id,
			    title = _action$payload$data.title,
			    author = _action$payload$data.author,
			    imageurl = _action$payload$data.imageurl;

			books.push({
				_id: _id,
				title: title,
				author: author,
				imageurl: imageurl
			});

			return _extends({}, state, {
				status: "succeed",
				books: books
			});

		case "ADD_BOOK_REJECTED":
			return _extends({}, state, {
				status: "failed",
				err: action.payload.data
			});

		case "FETCH_SHELF_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_SHELF_FULFILLED":
			return _extends({}, state, {
				status: "succeed",
				books: action.payload.data
			});

		case "FETCH_SHELF_REJECTED":
			return _extends({}, state, {
				status: "failed",
				err: action.payload.data
			});

		case "REMOVE_BOOK_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});
		case "REMOVE_BOOK_FULFILLED":
			var data = action.payload.data;
			// remove book from the collection

			var books = state.books.filter(function (val) {
				console.log("val id", val._id);
				return val._id != data;
			});
			return _extends({}, state, {
				status: "succeed",
				books: books
			});

		case "REMOVE_BOOK_REJECTED":
			return _extends({}, state, {
				status: "failed",
				err: action.payload.data
			});

		default:
			return state;
	}
}