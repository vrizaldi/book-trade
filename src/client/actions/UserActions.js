import axios from "axios";

export function login(username, password) {
	return {
		type: "LOGIN",
		payload: axios({
			method: "post",
			url: "/login",
			data: {
				username, 
				password
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

export function signup(username, password) {
	return {
		type: "SIGN_UP",
		payload: axios({
			method: "post",
			url: "/signup",
			data: {
				username, 
				password
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}