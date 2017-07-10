"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = cancelRequest;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cancelRequest(req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    requestID = _req$body.requestID;
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	console.log(username + " is cancelling " + requestID + "...");
	_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
		if (err) {
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
					_id: _mongodb2.default.ObjectId(requestID)
				}
			}
		}, {
			returnOriginal: false
		}, function (err, userChange) {
			var user = userChange.value;
			console.log("userChange", userChange);
			if (err) {
				res.status(500).send();
				return db.close();
			} else {
				// user found and updated, proceed
				// find the request
				db.collection("requests").findOne({
					_id: _mongodb2.default.ObjectId(requestID)
				}, function (err, request) {
					console.log("request", request);
					if (err) {
						res.status(500).send();
						return db.close();
					} else if (request) {
						// request found
						// delete the request off the book owners' notif
						var ownerQuery = request.to.map(function (owner) {
							return { _id: _mongodb2.default.ObjectId(owner._id) };
						});
						db.collection("users").update({
							$or: ownerQuery
						}, {
							$pull: {
								requestNotifs: {
									_id: _mongodb2.default.ObjectId(requestID)
								}
							}
						}, function (err, change) {
							console.log("change", change);
							if (err) {
								res.status(500).send();
								return db.close();
							} else {
								// owners notif updated, proceed
								// remove the request from collection
								db.collection("requests").remove({
									_id: _mongodb2.default.ObjectId(requestID)
								}, function (err) {
									if (err) {
										res.status(500).send();
										return db.close();
									}

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