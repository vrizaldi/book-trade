"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loadShelf;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadShelf(req, res) {
	var username = req.query.username;
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	console.log("Loading shelf for", username);

	_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
		if (err) {
			res.status(500).send();
			return db.close();
		}

		// find user
		db.collection("users").findOne({
			username: username
		}, function (err, user) {
			//			console.log("user", user);
			if (err) {
				res.status(500).send();
				return db.close();
			} else if (user) {
				// user found, proceed
				if (user.books == undefined) {
					// user doeesn't have any book
					res.json([]);
					return db.close();
				}

				// map the books array for the or expression
				console.log(user.books);
				var booksQuery = user.books.map(function (book) {
					return { _id: _mongodb2.default.ObjectId(book._id) };
				});
				db.collection("books").find({
					$or: booksQuery
				}).toArray(function (err, docs) {
					if (err || docs.length == 0) {
						res.status(500).send();
						return db.close();
					}

					// all successful
					console.log("docs", docs);
					console.log("Shelf data sent to user");
					res.json(docs);
				});
			} else {
				// user wasn't found
				res.status(401).send("User is unauthorized");
				return db.close();
			}
		});
	});
}