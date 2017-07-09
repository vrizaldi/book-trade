import axios from "axios";
import mongo from "mongodb";

import mongologin from "./mongodb.__secret";

export default function addBook(req, res) {
	const { username, title, author } = req.body;
	const { dbusername, dbpassword } = mongologin;

	var parsedTitle = title.trim().split(" ").join("+");
	var parsedAuthor = author.trim().split(" ").join("+");

	console.log(`Searching book:${parsedTitle} author:${parsedAuthor} for ${username}...`);
	axios.get(
		`https://www.googleapis.com/books/v1/volumes?q=intitle:${parsedTitle}+inauthor:${parsedAuthor}`
	).then((bookRes) => {

		if(bookRes.data.totalItems > 0) {
			// book found, so proceed
			var book = bookRes.data.items[0];
			console.log(`Book found: ${book.volumeInfo.title} by ${book.volumeInfo.authors[0]}`);

			// connect to the database
			mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
				if(err) {
					res.status(500).send();
					return db.close();
				}

				// find user
				db.collection("users").findOne({
					username: username
				}, (err, user) => {
					if(err) {
						res.status(500).send();
						db.close();
					}

					if(user === null) {
						// user not found
						res.status(401).send("User unauthorized");
						db.close();
					}

					console.log("user", user);

					// user found, so proceed
					// update book ownership / insert new book
					db.collection("books").update({
						_id: mongo.ObjectId(book.id)
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
					}, (err) => {
						if(err) {
							res.status(500).send();
							return db.close();
						}

						// update user
						db.collection("users").findOneAndUpdate({
							_id: mongo.ObjectId(user._id)
						}, {
							$push: {
								books: mongo.ObjectId(book.id)
							}
						});

						// update successful
						console.log("Book added to database");
						res.json({
							bookID: mongo.ObjectId(book.id),
							title: book.volumeInfo.title,
							author: book.volumeInfo.authors[0],
							imageurl: book.volumeInfo.imageLinks.thumbnail
						});
					});	// update book
				});	// find user
			});	// mongo connect

		} else {
			// 0 result found
			res.status(404).send("Book not found");
		}
	}).catch((err) => {
		console.log("err", err);
	});
}