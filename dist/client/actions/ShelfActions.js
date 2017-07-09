"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchShelf = fetchShelf;
exports.addBook = addBook;
exports.removeBook = removeBook;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchShelf(username) {
	return {
		type: "FETCH_SHELF",
		payload: _axios2.default.get("/load_shelf?username=" + username)
	};
}

function addBook(username, title, author) {
	return {
		type: "ADD_BOOK",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/add_book",
			data: {
				username: username,
				title: title,
				author: author
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

function removeBook(username, bookID) {
	return {
		type: "REMOVE_BOOK",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/remove_book",
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