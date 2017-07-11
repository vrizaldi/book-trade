import mongo from "mongodb";
import bcrypt from "bcrypt-nodejs";

import mongologin from "./mongodb.__secret";

const SALT_ROUNDS = 10;

export default function handleSignup(req, res) {
	const { username, password } = req.body;
	const { dbusername, dbpassword } = mongologin;

	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return;
		}

		// check if username is used
		db.collection("users").findOne({
			username: username,
		}, (err, user) => {
			if(err) {
				res.status(500).send();
				return db.close();
			}

			if(user !== null) {
				// username is used
				// tell the user
				res.status(401).send("Username is used");

			} else {
				// username is available, so proceed
				// hash password
				bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
					if(err) {
						res.status(500).send();
						return db.close();
					}
						
					bcrypt.hash(password, salt, null, (err, hash) => {
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
							state: "" ,
							requests: [],
							requestNotifs: []
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
