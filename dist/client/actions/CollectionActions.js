"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchCollection = fetchCollection;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchCollection() {
	return {
		type: "FETCH_COLLECTION",
		payload: _axios2.default.get("/load_all")
	};
}