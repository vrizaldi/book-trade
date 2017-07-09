"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _servePage = require("./servePage");

var _servePage2 = _interopRequireDefault(_servePage);

var _handleLogin = require("./handleLogin");

var _handleLogin2 = _interopRequireDefault(_handleLogin);

var _handleSignup = require("./handleSignup");

var _handleSignup2 = _interopRequireDefault(_handleSignup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

server.use(_express2.default.static(__dirname + "/../public"));
var jsonencoded = _bodyParser2.default.json();

server.get("*", _servePage2.default);
server.post("/login", jsonencoded, _handleLogin2.default);
server.post("/signup", jsonencoded, _handleSignup2.default);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, function (err) {
	if (err) throw err;

	console.log("Server is listening on port " + port);
});