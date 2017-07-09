"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = removeBook;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeBook(req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    bookID = _req$body.bookID;
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	console.log("User " + username + " is removing " + bookID + "...");

	_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
		if (err) {
			res.status(500).send();
			return db.close();
		}

		// check the user credential
		db.collection("users").findOneAndUpdate({
			username: username
		}, {
			$pull: {
				books: {
					_id: _mongodb2.default.ObjectId(bookID)
				}
			}
		}, {
			returnOriginal: false
		}, function (err, userChange) {
			console.log("userchange", userChange);
			if (err) {
				res.status(500).send();
				return db.close();
			} else if (userChange) {
				// user found, proceed
				db.collection("books").findOneAndUpdate({
					_id: _mongodb2.default.ObjectId(bookID)
				}, {
					$pull: {
						owners: {
							_id: _mongodb2.default.ObjectId(userChange.value._id)
						}
					}
				}, {
					returnOriginal: false
				}, function (err, bookChange) {
					if (err) {
						res.status(500).send();
					} else if (bookChange.value == null) {
						// book wasn't found
						res.status(404).send("Book not found");
					} else if (bookChange.value.owners.length == 0) {
						console.log();
						// no one owns the book anymore
						// remove it from collection
						db.collection("books").remove({
							_id: _mongodb2.default.ObjectId(bookID)
						}, function (err) {
							if (err) {
								res.status(500).send();
								return db.close();
							}

							// return the new book collection
							res.send(bookID);
							db.close();
							console.log("Book " + bookID + " is removed");
						});
					} else {
						// return the new book collection
						res.send(bookID);
						db.close();
						console.log("Book " + bookID + " is removed");
					}
				});
			} else {
				// user not found
				res.status(401).send("User is unauthorized");
				return db.close();
			}
		});
	});
}