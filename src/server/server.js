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

var server = express();

server.use(express.static(__dirname + "/../public"));
const jsonencoded = bodyParser.json();

server.get("/load_all", loadAll);
server.get("/load_shelf", loadShelf);
server.get("*", servePage);

server.post("/login", jsonencoded, handleLogin);
server.post("/signup", jsonencoded, handleSignup);
server.post("/add_book", jsonencoded, addBook);
server.post("/remove_book", jsonencoded, removeBook);
server.post("/request", jsonencoded, requestBook);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, 
	function(err) {
		if(err) throw err;

		console.log("Server is listening on port " + port);
	});
