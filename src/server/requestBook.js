import mongo from "mongodb";

import mongologin from "./mongodb.__secret";

export default function requestBook(req, res) {
	const { username, bookID } = req.body;
	const { dbusername, dbpassword } = mongologin;

	console.log(`User ${username} is requesting ${bookID}...`);
	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return;
		}

		// check if user exist
		db.collection("users").findOne({
			username: username
		}, (err, user) => {
			console.log("user", user);
			if(err) {
				res.status(500).send();
				return db.close();
			
			} else if(user) {
				// user is found, proceed
				// find users who have the book
				db.collection("users").find({
					books: {
						_id: mongo.ObjectId(bookID)
					}
				}).toArray((err, docs) => {
					console.log("docs", docs);
					if(err) {
						res.status(500).send();
						return db.close();

					} else if(docs.length == 0) {
						// no one has the book
						res.status(404).send("Book not found");
						return db.close();

					} else {
						// someone has the book
						// map the id of the users with the book
						var owners = docs.map((val) => {
							return {
								_id: mongo.ObjectId(val._id)
							};
						});

						// create the request
						var request = {
							from: mongo.ObjectId(user._id),
							to: owners,
							for: mongo.ObjectId(bookID)
						};

						db.collection("requests").save(request, (err) => {
							if(err) {
								res.status(500).send();
								return db.close();
							}

							// request created
							// map owner for $or query
							var ownerQuery = owners.map((val) => {
								return {
									_id: mongo.ObjectId(val._id)
								};
							});
							// update the owners request notification
							db.collection("users").update({
								$or: ownerQuery
							}, {
								$push: {
									requestNotifs: {
										_id: mongo.ObjectId(request._id)
									}
								}
							}, {
								multi: true
							}, (err, change) => {
								if(err) {
									res.status(500).send();
									return db.close();

								} else if(change.result.nModified > 0) {
									// modified successfully
									console.log("change", change);

									// update the user request array
									db.collection("users").findOneAndUpdate({
										username: username
									}, {
										$push: {
											requests: {
												_id: mongo.ObjectId(request._id)
											}
										}
									}, {
										returnOriginal: false
									}, (err, userChange) => {
										var user = userChange.value;
										if(err) {
											res.status(500).send();
											return db.close();

										} else {
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
															
															// everything went perfectly
															console.log("Request succesfully created");
															console.log("userChange value", userChange.value);
															res.json({
																requests: requests,
																requestNotifs: requestNotifs
															});
															db.close();
															db.close();
														}
													});
												}
											});

											
										}
									});
								} else {
									res.status(500).send();
									return db.close();
								}
							});
						});


					}
				});

			} else {
				// user is not found
				res.status(401).send("User is unauthorized");
				return db.close();
			}
		});
	});
}