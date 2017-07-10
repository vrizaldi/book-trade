"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parseRequest;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseRequest(req, res) {
	var _req$body = req.body,
	    requests = _req$body.requests,
	    requestNotifs = _req$body.requestNotifs;
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	console.log("requests:", requests);
	console.log("requestNotifs:", requestNotifs);

	_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
		if (err) {
			res.status(500).send();
			return;
		} else {
			// operate on the requests
			// parse book request
			var bookReqQuery = requests.length > 0 ? requests.map(function (request) {
				console.log("request for", request);
				return { _id: _mongodb2.default.ObjectId(request.for) };
			}) : [{ _id: "null" }];
			console.log("bookReqQuery", bookReqQuery);
			db.collection("books").find({
				$or: bookReqQuery
			}).toArray(function (err, booksReq) {
				console.log("books", booksReq);
				if (err) {
					console.log("err", err);
					res.status(500).send();
					return db.close();
				} else {
					// books for requests found, proceed

					// remap booksReq, change their id to the id of request
					if (requests) {
						booksReq = booksReq.map(function (book) {
							var i = requests.findIndex(function (val) {
								console.log("val", val);
								console.log("book._id", book._id);
								return _mongodb2.default.ObjectId(val.for).toString() == book._id.toString();
							});
							console.log("i", i);
							book._id = _mongodb2.default.ObjectId(requests[i]._id);
							return book;
						});
						console.log("booksReq remap", booksReq);
					}

					// parse book request notifs
					var bookNotifQuery = requestNotifs.length > 0 ? requestNotifs.map(function (request) {
						return { _id: _mongodb2.default.ObjectId(request.for) };
					}) : [{ _id: "null" }];

					console.log("bookNotifQuery", bookNotifQuery);
					db.collection("books").find({
						$or: bookNotifQuery
					}).toArray(function (err, booksNotif) {
						console.log("books notif", booksNotif);
						if (err) {
							res.status(500).send();
							return db.close();
						} else {
							// parse where the user request notifs are from
							var userNotifQuery = requestNotifs.length > 0 ? requestNotifs.map(function (request) {
								return { _id: _mongodb2.default.ObjectId(request.from) };
							}) : [{ _id: "null" }];

							console.log("requestNotifs", requestNotifs);
							console.log("userNotifQuery", userNotifQuery);
							db.collection("users").find({
								$or: userNotifQuery
							}).toArray(function (err, userNotif) {
								console.log("userNotif", userNotif);
								if (err) {
									res.status(500).send();
									return db.close();
								} else {
									// combine booksnotif and usernotif together
									var notifs = booksNotif.map(function (notif, i) {
										console.log("notif", notif);
										var index = userNotif.findIndex(function (val) {
											return val._id.toString() == userNotifQuery[i]._id.toString();
										});
										console.log("index", index, "userNotif", userNotif);
										console.log("mongo.ObjectId(requests[i]._id)", _mongodb2.default.ObjectId(requests[i]._id));
										notif._id = _mongodb2.default.ObjectId(requests[i]._id);
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