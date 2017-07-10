import mongo from "mongodb";

import mongologin from "./mongodb.__secret";

export default function updateBio(req, res) {
	var { username, fullName, city, state } = req.body;
	const { dbusername, dbpassword } = mongologin;

	console.log(`${fullName} (${username}) lives in ${city}, ${state}`);
	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			db.close();
		}

		// check if user exist
		db.collection("users").findOne({
			username
		}, (err, user) => {
			if(err) {
				res.status(500).send();
				db.close();

			} else if(user) {
				// user found, proceed
				// use defaults if empty string is given
				fullName = fullName == "" ? user.fullName : fullName;
				city = city == "" ? user.city : city;
				state = state == "" ? user.state : state;
				
				// update it
				db.collection("users").findOneAndUpdate({
					username
				}, {
					$set: {
						fullName,
						city,
						state
					}
				}, {
					returnOriginal: false
				}, (err, userChange) => {
					if(err) {
						res.status(500).send();
						db.close();
					}

					// everything went perfectly
					console.log("Successfully updated user data");
					res.json({
						fullName: userChange.value.fullName,
						city: userChange.value.city,
						state: userChange.value.state
					});
				});

			} else {
				// user not found
				res.status(401).send("User is unauthorized");
				db.close();
			}
		});
	});
}