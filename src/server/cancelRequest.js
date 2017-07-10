import mongo from "mongodb";

import mongologin from "./mongodb.__secret";

export default function cancelRequest(req, res) {
	const { username, requestID } = req.body;
	const { dbusername, dbpassword } = mongologin;

	console.log(`${username} is cancelling ${requestID}...`);
	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return;
		} 

		// check if user exist
		// and remove the request from its list
		db.collection("users").findOneAndUpdate({
			username: username
		}, {
			$pull: {
				requests: {
					_id: mongo.ObjectId(requestID)
				}
			}
		}, {
			returnOriginal: false
		}, (err, userChange) => {
			var user = userChange.value;
			console.log("userChange", userChange);
			if(err) {
				res.status(500).send();
				return db.close();

			} else {
				// user found and updated, proceed
				// find the request
				db.collection("requests").findOne({
					_id: mongo.ObjectId(requestID)
				}, (err, request) => {
					console.log("request", request);
					if(err) {
						res.status(500).send();
						return db.close();
					} else if(request) {
						// request found
						// delete the request off the book owners' notif
						var ownerQuery = request.to.map((owner) => {
							return {_id: mongo.ObjectId(owner._id)};
						});
						db.collection("users").update({
							$or: ownerQuery
						}, {
							$pull: {
								requestNotifs: {
									_id: mongo.ObjectId(requestID)
								}
							}
						}, (err, change) => {
							console.log("change", change);
							if(err) {
								res.status(500).send();
								return db.close();

							} else {
								// owners notif updated, proceed
								// remove the request from collection
								db.collection("requests").remove({
									_id: mongo.ObjectId(requestID)
								}, (err) => {
									if(err) {
										res.status(500).send();
										return db.close();
									}

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
													console.log("Request removed");
													console.log("userChange value", userChange.value);
													res.json({
														requests: requests,
														requestNotifs: requestNotifs
													});
													db.close();
												}
											});
										}
									});
								});
							}
						});	

					} else {
						// request not found
						res.status(404).send("Request not found");
						return db.close();
					}
				});
			}
		});
	});
}