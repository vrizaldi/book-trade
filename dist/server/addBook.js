"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = addBook;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addBook(req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    title = _req$body.title,
	    author = _req$body.author;
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	var parsedTitle = title.trim().split(" ").join("+");
	var parsedAuthor = author.trim().split(" ").join("+");

	console.log("Searching book:" + parsedTitle + " author:" + parsedAuthor + " for " + username + "...");
	_axios2.default.get("https://www.googleapis.com/books/v1/volumes?q=intitle:" + parsedTitle + "+inauthor:" + parsedAuthor).then(function (bookRes) {

		if (bookRes.data.totalItems > 0) {
			// book found, so proceed
			var book = bookRes.data.items[0];
			console.log("Book found: " + book.volumeInfo.title + " by " + book.volumeInfo.authors[0]);

			// connect to the database
			_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
				if (err) {
					res.status(500).send();
					return db.close();
				}

				// find user
				db.collection("users").findOne({
					username: username
				}, function (err, user) {
					if (err) {
						res.status(500).send();
						db.close();
					}

					if (user === null) {
						// user not found
						res.status(401).send("User unauthorized");
						db.close();
					}

					console.log("user", user);

					// user found, so proceed
					// update book ownership / insert new book
					db.collection("books").update({
						_id: _mongodb2.default.ObjectId(book.id)
					}, {
						$set: {
							title: book.volumeInfo.title,
							author: book.volumeInfo.authors[0],
							imageurl: book.volumeInfo.imageLinks.medium
						},
						$push: {
							owner: user._id
						}
					}, {
						upsert: true,
						returnOriginal: false
					}, function (err) {
						if (err) {
							res.status(500).send();
							return db.close();
						}

						// update user
						db.collection("users").findOneAndUpdate({
							_id: _mongodb2.default.ObjectId(user._id)
						}, {
							$push: {
								books: _mongodb2.default.ObjectId(book.id)
							}
						});

						// update successful
						console.log("Book added to database");
						res.json({
							bookID: _mongodb2.default.ObjectId(book.id),
							title: book.volumeInfo.title,
							author: book.volumeInfo.authors[0],
							imageurl: book.volumeInfo.imageLinks.thumbnail
						});
					}); // update book
				}); // find user
			}); // mongo connect
		} else {
			// 0 result found
			res.status(404).send("Book not found");
		}
	}).catch(function (err) {
		console.log("err", err);
	});
}