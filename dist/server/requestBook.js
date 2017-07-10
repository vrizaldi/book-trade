"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = requestBook;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requestBook(req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    bookID = _req$body.bookID;
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	console.log("User " + username + " is requesting " + bookID + "...");
	_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
		if (err) {
			res.status(500).send();
			return;
		}

		// check if user exist
		db.collection("users").findOne({
			username: username
		}, function (err, user) {
			console.log("user", user);
			if (err) {
				res.status(500).send();
				return db.close();
			} else if (user) {
				// user is found, proceed
				// find users who have the book
				db.collection("users").find({
					books: {
						_id: _mongodb2.default.ObjectId(bookID)
					}
				}).toArray(function (err, docs) {
					console.log("docs", docs);
					if (err) {
						res.status(500).send();
						return db.close();
					} else if (docs.length == 0) {
						// no one has the book
						res.status(404).send("Book not found");
						return db.close();
					} else {
						// someone has the book
						// map the id of the users with the book
						var owners = docs.map(function (val) {
							return {
								_id: _mongodb2.default.ObjectId(val._id)
							};
						});

						// create the request
						var request = {
							from: _mongodb2.default.ObjectId(user._id),
							to: owners,
							for: _mongodb2.default.ObjectId(bookID)
						};

						db.collection("requests").save(request, function (err) {
							if (err) {
								res.status(500).send();
								return db.close();
							}

							// request created
							// map owner for $or query
							var ownerQuery = owners.map(function (val) {
								return {
									_id: _mongodb2.default.ObjectId(val._id)
								};
							});
							// update the owners request notification
							db.collection("users").update({
								$or: ownerQuery
							}, {
								$push: {
									requestNotifs: {
										_id: _mongodb2.default.ObjectId(request._id)
									}
								}
							}, {
								multi: true
							}, function (err, change) {
								if (err) {
									res.status(500).send();
									return db.close();
								} else if (change.result.nModified > 0) {
									// modified successfully
									console.log("change", change);

									// update the user request array
									db.collection("users").findOneAndUpdate({
										username: username
									}, {
										$push: {
											requests: {
												_id: _mongodb2.default.ObjectId(request._id)
											}
										}
									}, {
										returnOriginal: false
									}, function (err, userChange) {
										var user = userChange.value;
										if (err) {
											res.status(500).send();
											return db.close();
										} else {
											// parse request
											var requestQuery = user.requests.length > 0 ? user.requests.map(function (request) {
												return { _id: _mongodb2.default.ObjectId(request._id) };
											}) : [{ _id: "null" }];

											// search database for requests
											console.log("requestQuery", requestQuery);
											db.collection("requests").find({
												$or: requestQuery
											}).toArray(function (err, requests) {
												if (err) {
													console.log(err);
													res.status(500).send();
													return db.close();
												} else {
													console.log("requests", requests);

													// successfully load requests, proceed
													// parse request notifs
													var notifQuery = user.requestNotifs.length > 0 ? user.requestNotifs.map(function (notif) {
														return { _id: _mongodb2.default.ObjectId(notif._id) };
													}) : [{ _id: "null" }];

													// search database for request
													console.log("notifQuery", notifQuery);
													db.collection("requests").find({
														$or: notifQuery
													}).toArray(function (err, requestNotifs) {
														if (err) {
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