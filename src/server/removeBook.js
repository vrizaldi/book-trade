import mongo from "mongodb";

import mongologin from "./mongodb.__secret";

export default function removeBook(req, res) {
	const { username, bookID } = req.body;
	const { dbusername, dbpassword } = mongologin; 

	console.log(`User ${username} is removing ${bookID}...`);

	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return db.close();
		}

		// check the user credential
		db.collection("users").findOneAndUpdate({
			username: username
		},{
			$pull: {
				books: {
					_id: mongo.ObjectId(bookID)
				}
			}
		}, {
			returnOriginal: false
		}, (err, userChange) => {
			console.log("userchange", userChange);
			if(err) {
				res.status(500).send();
				return db.close();

			} else if(userChange) {
				// user found, proceed
				db.collection("books").findOneAndUpdate({
					_id: mongo.ObjectId(bookID)
				}, {
					$pull: {
						owners: {
							_id: mongo.ObjectId(userChange.value._id)
						}
					}
				}, {
					returnOriginal: false
				}, (err, bookChange) => {
					if(err) {
						res.status(500).send();
					} else if(bookChange.value == null) {
						// book wasn't found
						res.status(404).send("Book not found");

					} else if(bookChange.value.owners.length == 0) {
						console.log();
						// no one owns the book anymore
						// remove it from collection
						db.collection("books").remove({
							_id: mongo.ObjectId(bookID)
						}, (err) => {
							if(err) {
								res.status(500).send();
								return db.close();	
							}

							// return the new book collection
							res.send(bookID);
							db.close();
							console.log(`Book ${bookID} is removed`);
						});

					} else {
						// return the new book collection
						res.send(bookID);
						db.close();
						console.log(`Book ${bookID} is removed`);
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