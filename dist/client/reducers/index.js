"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require("redux");

var _userReducer = require("./userReducer");

var _userReducer2 = _interopRequireDefault(_userReducer);

var _shelfReducer = require("./shelfReducer");

var _shelfReducer2 = _interopRequireDefault(_shelfReducer);

var _collectionReducer = require("./collectionReducer");

var _collectionReducer2 = _interopRequireDefault(_collectionReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	user: _userReducer2.default,
	shelf: _shelfReducer2.default,
	collection: _collectionReducer2.default
});