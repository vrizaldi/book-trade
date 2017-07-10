import express from "express";
import bodyParser from "body-parser";

import servePage from "./servePage";
import handleLogin from "./handleLogin";
import handleSignup from "./handleSignup";
import loadAll from "./loadAll";
import loadShelf from "./loadShelf";
import addBook from "./addBook";
import removeBook from "./removeBook";
import requestBook from "./requestBook";
import cancelRequest from "./cancelRequest";
import parseRequest from "./parseRequest";
import updateBio from "./updateBio";

var server = express();

server.use(express.static(__dirname + "/../public"));
const jsonencoded = bodyParser.json();

server.get("/load_all", loadAll);
server.get("/load_shelf", loadShelf);
server.post("/parse_request", jsonencoded, parseRequest);
server.get("*", servePage);

server.post("/login", jsonencoded, handleLogin);
server.post("/signup", jsonencoded, handleSignup);
server.post("/add_book", jsonencoded, addBook);
server.post("/remove_book", jsonencoded, removeBook);
server.post("/request", jsonencoded, requestBook);
server.post("/cancel_request", jsonencoded, cancelRequest);
server.post("/update_bio", jsonencoded, updateBio);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, 
	function(err) {
		if(err) throw err;

		console.log("Server is listening on port " + port);
	});
