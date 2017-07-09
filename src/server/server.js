import express from "express";
import bodyParser from "body-parser";

import servePage from "./servePage";
import handleLogin from "./handleLogin";
import handleSignup from "./handleSignup";

var server = express();

server.use(express.static(__dirname + "/../public"));
const jsonencoded = bodyParser.json();

server.get("*", servePage);
server.post("/login", jsonencoded, handleLogin);
server.post("/signup", jsonencoded, handleSignup);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, 
	function(err) {
		if(err) throw err;

		console.log("Server is listening on port " + port);
	});
