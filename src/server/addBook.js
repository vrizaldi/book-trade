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

				// save book into database
				db.collection("books").save({
					bookID: book.id,
					title: book.volumeInfo.title,
					imageurl: book.volumeInfo.imageLinks.medium
				}, (err) => {
					if(err) {
						res.status(500).send();
						return db.close();
					}

					// if succeeds, update ownership
					db.collection("ownerships").save({
						bookID: book.id,
						username: username
					}, (err) => {
						if(err) {
							res.status(500).send();
							return db.close();
						}

						// all went perfectly
						console.log("Successfully updated");
						res.json({
							bookID: book.id,
							title: book.volumeInfo.title,
							imageurl: book.volumeInfo.imageLinks.medium
						});

					});	// db ownership save
				});	// db books save
			});	// mongo connect

		} else {
			// 0 result found
			res.status(404).send("Book not found");
		}
	}).catch((err) => {
		console.log("err", err);
	});
}