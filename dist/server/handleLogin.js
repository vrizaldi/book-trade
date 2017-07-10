"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = handleLogin;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleLogin(req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    password = _req$body.password;
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
		if (err) {
			res.status(500).send();
			return;
		}

		db.collection("users").findOne({
			username: username
		}, function (err, user) {
			if (err) {
				res.status(401).send("Invalid username and password combination");
				return db.close();
			}

			if (user) {
				// user found, proceed

				// compare hash of password entered and password stored
				_bcrypt2.default.compare(password, user.passwordHash, function (err, valid) {
					if (err) {
						res.status(500).send();
						return db.close();
					}

					// check if password is valid
					if (valid) {
						// parse request
						var requestQuery = user.requests.length > 0 ? user.requests.map(function (request) {
							return { _id: _mongodb2.default.ObjectId(request._id) };
						}) : [{ _id: "null" }];

						// search database for requests
						console.log("requestQuery", requestQuery);
						db.collection("requests").find({
							$or: requestQuery
						}).toArray(function (err, requests) {
							if (err) {
								console.log(err);
								res.status(500).send();
								return db.close();
							} else {
								console.log("requests", requests);

								// successfully load requests, proceed
								// parse request notifs
								var notifQuery = user.requestNotifs.length > 0 ? user.requestNotifs.map(function (notif) {
									return { _id: _mongodb2.default.ObjectId(notif._id) };
								}) : [{ _id: "null" }];

								// search database for request
								console.log("notifQuery", notifQuery);
								db.collection("requests").find({
									$or: notifQuery
								}).toArray(function (err, requestNotifs) {
									if (err) {
										res.status(500).send();
										console.log(err);
										return db.close();
									} else {
										// successfully load request notifs
										// everything went perfectly
										console.log("requestNotifs", requestNotifs);
										console.log("User logged in successfully");
										res.json({
											username: user.username,
											fullName: user.fullName,
											city: user.city,
											state: user.state,
											requests: requests,
											requestNotifs: requestNotifs
										});
										db.close();
									}
								});
							}
						});
					} else {
						res.status(401).send("Invalid username and password combination");
						console.log("User failed to login");
						db.close();
					}
				});
			} else {
				// user not found
				res.status(401).send("Invalid username and password combination");
			}
		});
	});
}