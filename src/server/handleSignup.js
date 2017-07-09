import mongo from "mongodb";
import bcrypt from "bcrypt";

import mongologin from "./mongodb.__secret";

const SALT_ROUNDS = 10;

export default function handleSignup(req, res) {
	const { username, password } = req.body;
	const { dbusername, dbpassword } = mongologin;

	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return db.close();
		}

		// check if username is used
		db.collection("users").find({
			username: username,
		}).toArray(function(err, docs) {
			if(err) {
				res.status(500).send();
				return db.close();
			}

			if(docs.length == 1) {
				// username is used
				// tell the user
				res.status(409).send("Username is used");

			} else {
				// username is available, so proceed
				// hash password
				bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
					if(err) {
						res.status(500).send();
						return db.close();
					}
						
					bcrypt.hash(password, salt, (err, hash) => {
						if(err) {
							res.status(500).send();
							return db.close();
						}

						// save user into the database
						console.log("Password hashed:", hash);
						db.collection("users").save({
							username,
							passwordHash: hash,
							fullName: "",
							city: "",
							state: "" 
						}, (err) => {
							if(err) {
								res.status(500).send();
								return db.close();
							}

							console.log("User signed up successfully");
							res.status(200).send("User signed up successfully");
							db.close();
						});
					});
				});

				
			}
		});
	});
}
