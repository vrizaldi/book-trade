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

var _loadAll = require("./loadAll");

var _loadAll2 = _interopRequireDefault(_loadAll);

var _loadShelf = require("./loadShelf");

var _loadShelf2 = _interopRequireDefault(_loadShelf);

var _addBook = require("./addBook");

var _addBook2 = _interopRequireDefault(_addBook);

var _removeBook = require("./removeBook");

var _removeBook2 = _interopRequireDefault(_removeBook);

var _requestBook = require("./requestBook");

var _requestBook2 = _interopRequireDefault(_requestBook);

var _cancelRequest = require("./cancelRequest");

var _cancelRequest2 = _interopRequireDefault(_cancelRequest);

var _parseRequest = require("./parseRequest");

var _parseRequest2 = _interopRequireDefault(_parseRequest);

var _updateBio = require("./updateBio");

var _updateBio2 = _interopRequireDefault(_updateBio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

server.use(_express2.default.static(__dirname + "/../public"));
var jsonencoded = _bodyParser2.default.json();

server.get("/load_all", _loadAll2.default);
server.get("/load_shelf", _loadShelf2.default);
server.post("/parse_request", jsonencoded, _parseRequest2.default);
server.get("*", _servePage2.default);

server.post("/login", jsonencoded, _handleLogin2.default);
server.post("/signup", jsonencoded, _handleSignup2.default);
server.post("/add_book", jsonencoded, _addBook2.default);
server.post("/remove_book", jsonencoded, _removeBook2.default);
server.post("/request", jsonencoded, _requestBook2.default);
server.post("/cancel_request", jsonencoded, _cancelRequest2.default);
server.post("/update_bio", jsonencoded, _updateBio2.default);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, function (err) {
	if (err) throw err;

	console.log("Server is listening on port " + port);
});