"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = handleSignup;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_ROUNDS = 10;

function handleSignup(req, res) {
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

		// check if username is used
		db.collection("users").find({
			username: username
		}).toArray(function (err, docs) {
			if (err) {
				res.status(500).send();
				return db.close();
			}

			if (docs.length == 1) {
				// username is used
				// tell the user
				res.status(409).send("Username is used");
			} else {
				// username is available, so proceed
				// hash password
				_bcrypt2.default.genSalt(SALT_ROUNDS, function (err, salt) {
					if (err) {
						res.status(500).send();
						return db.close();
					}

					_bcrypt2.default.hash(password, salt, function (err, hash) {
						if (err) {
							res.status(500).send();
							return db.close();
						}

						// save user into the database
						console.log("Password hashed:", hash);
						db.collection("users").save({
							username: username,
							passwordHash: hash,
							fullName: "",
							city: "",
							state: ""
						}, function (err) {
							if (err) {
								res.status(500).send();
								return db.close();
							}

							console.log("User signed up successfully");
							res.status(200).send("User signed up successfully");
							db.close();
						});
					});
				});
			}
		});
	});
}