import mongo from "mongodb";

import mongologin from "./mongodb.__secret";

export default function loadAll(req, res) {
	const { dbusername, dbpassword } = mongologin;

	console.log("Loading collection...");

	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return;
		}

		// get all the books
		db.collection("books").find().toArray((err, docs) => {
//			console.log("books", docs);
			if(err) {
				res.status(500).send();
				return db.close();
			}

			// return all the books
			res.json(docs);
			db.close();
			console.log("Collection loaded");
		});
	});
}