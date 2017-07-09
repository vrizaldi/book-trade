"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addBook = addBook;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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