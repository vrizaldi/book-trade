"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = updateBio;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateBio(req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    fullName = _req$body.fullName,
	    city = _req$body.city,
	    state = _req$body.state;
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	console.log(fullName + " (" + username + ") lives in " + city + ", " + state);
	_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
		if (err) {
			res.status(500).send();
			db.close();
		}

		// check if user exist
		db.collection("users").findOne({
			username: username
		}, function (err, user) {
			if (err) {
				res.status(500).send();
				db.close();
			} else if (user) {
				// user found, proceed
				// use defaults if empty string is given
				fullName = fullName == "" ? user.fullName : fullName;
				city = city == "" ? user.city : city;
				state = state == "" ? user.state : state;

				// update it
				db.collection("users").findOneAndUpdate({
					username: username
				}, {
					$set: {
						fullName: fullName,
						city: city,
						state: state
					}
				}, {
					returnOriginal: false
				}, function (err, userChange) {
					if (err) {
						res.status(500).send();
						db.close();
					}

					// everything went perfectly
					console.log("Successfully updated user data");
					res.json({
						fullName: userChange.value.fullName,
						city: userChange.value.city,
						state: userChange.value.state
					});
				});
			} else {
				// user not found
				res.status(401).send("User is unauthorized");
				db.close();
			}
		});
	});
}