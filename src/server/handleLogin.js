import mongo from "mongodb";
import bcrypt from "bcrypt";

import mongologin from "./mongodb.__secret";

export default function handleLogin(req, res) {
	const { username, password } = req.body;
	const { dbusername, dbpassword } = mongologin;

	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return db.close();
		}

		db.collection("users").find({
			username: username
		}).toArray((err, docs) => {
			if(err) { 
				res.status(401).send("Invalid username and password combination");
				return db.close();
			}

			if(docs.length == 1) {
				// user found, proceed
				var user = docs[0];

				// compare hash of password entered and password stored
				bcrypt.compare(
					password, 
					user.passwordHash, (err, valid) => {
						if(err) { 
							res.status(500).send();
							return db.close();
						}

						// check if password is valid
						if(valid) {
							res.json({
								username: user.username,
								fullName: user.fullName,
								city: user.city,
								state: user.state
							});
							console.log("User logged in successfully");

						} else {
							res.status(401).send("Invalid username and password combination");
							console.log("User failed to login");
						}
						db.close();
					});
			}
		});
	});
}