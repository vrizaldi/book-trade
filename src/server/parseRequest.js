import mongo from "mongodb";

import mongologin from "./mongodb.__secret";

export default function parseRequest(req, res) {
	const { requests, requestNotifs } = req.body;
	const { dbusername, dbpassword } = mongologin;

	console.log("requests:", requests);
	console.log("requestNotifs:", requestNotifs);

	mongo.connect(`mongodb://${dbusername}:${dbpassword}@ds153422.mlab.com:53422/book-trade`, (err, db) => {
		if(err) {
			res.status(500).send();
			return;

		} else {
			// operate on the requests
			// parse book request
			var bookReqQuery = requests.length > 0 ? requests.map((request) => {
				console.log("request for", request);
				return {_id: mongo.ObjectId(request.for)};
			}) : [{_id: "null"}];
			console.log("bookReqQuery", bookReqQuery);
			db.collection("books").find({
				$or: bookReqQuery
			}).toArray((err, booksReq) => {
				console.log("books", booksReq);
				if(err) {
					console.log("err", err);
					res.status(500).send();
					return db.close();

				} else {
					// books for requests found, proceed
					
					// remap booksReq, change their id to the id of request
					if(requests) {
						booksReq = booksReq.map((book) => {
							var i = requests.findIndex((val) => {
								console.log("val", val);
								console.log("book._id", book._id);
								return mongo.ObjectId(val.for).toString() == book._id.toString();
							});
							console.log("i", i);
							book._id = mongo.ObjectId(requests[i]._id);
							return book;
						});
						console.log("booksReq remap", booksReq);
					}

					// parse book request notifs
					var bookNotifQuery = requestNotifs.length > 0 ? 
						requestNotifs.map((request) => {
							return {_id: mongo.ObjectId(request.for)};
						}) : [{_id: "null"}];

					console.log("bookNotifQuery", bookNotifQuery);
					db.collection("books").find({
						$or: bookNotifQuery
					}).toArray((err, booksNotif) => {
						console.log("books notif", booksNotif);
						if(err) {
							res.status(500).send();
							return db.close();

						} else {
							// parse where the user request notifs are from
							var userNotifQuery = requestNotifs.length > 0 ?
								requestNotifs.map((request) => {
									return {_id: mongo.ObjectId(request.from)};
								}) : [{_id: "null"}];

							console.log("requestNotifs", requestNotifs);
							console.log("userNotifQuery", userNotifQuery);
							db.collection("users").find({
								$or: userNotifQuery
							}).toArray((err, userNotif) => {
								console.log("userNotif", userNotif);
								if(err) {
									res.status(500).send();
									return db.close();

								} else {
									// combine booksnotif and usernotif together
									var notifs = booksNotif.map((notif, i) => {
										console.log("notif", notif);
										var index = userNotif.findIndex((val) => {
											return val._id.toString()	 == userNotifQuery[i]._id.toString();
										});
										console.log("index", index,"userNotif", userNotif);
										console.log("mongo.ObjectId(requests[i]._id)", mongo.ObjectId(requests[i]._id));
										notif._id = mongo.ObjectId(requests[i]._id);
										notif.requester = userNotif[index].username;
										notif.requesterCity = userNotif[index].city;
										return notif;
									});
									console.log("notifs", notifs);

									// everything went perfectly
									console.log("Requests parsed successfully");
									res.json({
										requests: booksReq,
										requestNotifs: notifs
									});
									db.close();
								}
							});
						}
					});
				}
			});
		}
	});

}