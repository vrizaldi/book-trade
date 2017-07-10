import mongo from "mongodb";
import bcrypt from "bcrypt";

import mongologin from "./mongodb.__secret";

export default function handleLogin(req, res) {
	const { username, password } = req.body;
	const { dbusername, dbpassword } = mongologin;

	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return;
		}

		db.collection("users").findOne({
			username: username
		}, (err, user) => {
			if(err) { 
				res.status(401).send("Invalid username and password combination");
				return db.close();
			}

			if(user) {
				// user found, proceed

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
							// parse request
							var requestQuery = user.requests.length > 0 ? user.requests.map((request) => {
								return {_id: mongo.ObjectId(request._id)};
							}) : [{_id: "null"}];

							// search database for requests
							console.log("requestQuery", requestQuery);
							db.collection("requests").find({
								$or: requestQuery
							}).toArray((err, requests) => {
								if(err) { 
									console.log(err);
									res.status(500).send();
									return db.close();
								
								} else  {
									console.log("requests", requests);

									// successfully load requests, proceed
									// parse request notifs
									var notifQuery = user.requestNotifs.length > 0 ? user.requestNotifs.map((notif) => {
										return {_id: mongo.ObjectId(notif._id)};
									}) : [{_id: "null"}];

									// search database for request
									console.log("notifQuery", notifQuery);
									db.collection("requests").find({
										$or: notifQuery
									}).toArray((err, requestNotifs) => {
										if(err) { 
											res.status(500).send();
											console.log(err);
											return db.close();
										
										} else {
											// successfully load request notifs
											// everything went perfectly
											console.log("requestNotifs", requestNotifs);
											console.log("User logged in successfully");
											res.json({
												username: user.username,
												fullName: user.fullName,
												city: user.city,
												state: user.state,
												requests: requests,
												requestNotifs: requestNotifs
											});
											db.close();
										}
									});
								}
							});

						} else {
							res.status(401).send("Invalid username and password combination");
							console.log("User failed to login");
							db.close();
						}
					});
			
			} else {
				// user not found
				res.status(401).send("Invalid username and password combination");
			}
		});
	});
}