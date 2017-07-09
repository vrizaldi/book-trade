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
			return db.close();
		}

		db.collection("users").find({
			username: username
		}).toArray(function (err, docs) {
			if (err) {
				res.status(401).send("Invalid username and password combination");
				return db.close();
			}

			if (docs.length == 1) {
				// user found, proceed
				var user = docs[0];

				// compare hash of password entered and password stored
				_bcrypt2.default.compare(password, user.passwordHash, function (err, valid) {
					if (err) {
						res.status(500).send();
						return db.close();
					}

					// check if password is valid
					if (valid) {
						res.json({
							username: user.username,
							fullName: user.fullName,
							city: user.city,
							state: user.state
						});
						console.log("User logged in successfully");
					} else {
						res.status(401).send("Invalid username and password combination");
						console.log("User failed to login");
					}
					db.close();
				});
			}
		});
	});
}