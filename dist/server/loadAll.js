"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loadAll;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mongodb3 = require("./mongodb.__secret");

var _mongodb4 = _interopRequireDefault(_mongodb3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadAll(req, res) {
	var dbusername = _mongodb4.default.dbusername,
	    dbpassword = _mongodb4.default.dbpassword;


	console.log("Loading collection...");

	_mongodb2.default.connect("mongodb://" + dbusername + ":" + dbpassword + "@ds153422.mlab.com:53422/book-trade", function (err, db) {
		if (err) {
			res.status(500).send();
			return;
		}

		// get all the books
		db.collection("books").find().toArray(function (err, docs) {
			//			console.log("books", docs);
			if (err) {
				res.status(500).send();
				return db.close();
			}

			// return all the books
			res.json(docs);
			db.close();
			console.log("Collection loaded");
		});
	});
}