import mongo from "mongodb";

import mongologin from "./mongodb.__secret";

export default function loadShelf(req, res) {
	const { username } = req.query;
	const { dbusername, dbpassword } = mongologin;

	console.log("Loading shelf for", username);

	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return;
		}

		// find user
		db.collection("users").findOne({
			username: username
		}, (err, user) => {
//			console.log("user", user);
			if(err) {
				res.status(500).send();
				return db.close();

			} else if(user) {
				// user found, proceed
				if(user.books == undefined) {
					// user doeesn't have any book
					res.json([]);
					return db.close();
				}

				// map the books array for the or expression
				console.log(user.books);
				var booksQuery = user.books.map((book) => {
					return {_id: mongo.ObjectId(book._id)};
				});
				db.collection("books").find({
					$or: booksQuery
				}).toArray((err, docs) => {
					if(err || docs.length == 0) {
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