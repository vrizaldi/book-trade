import axios from "axios";

export function login(username, password) {
	return (dispatch) => {
		dispatch({
			type: "LOGIN_PENDING"
		});

		// basic login
		axios({
			method: "post",
			url: "/login",
			data: {
				username, 
				password
			},
			headers: {
				"content-type": "application/json"
			}
		}).then((res) => {
			console.log("res", res);
			// acquired user data
			dispatch({
				type: "USER_DATA_RECEIVED",
				payload: res
			});

			// parse the requests
			parseRequests(dispatch, res.data.requests, res.data.requestNotifs);

		}).catch((err) => {
			console.log("err", err);
			dispatch({
				type: "USER_DATA_REJECTED",
				payload: err
			});
		});
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

export function request(username, bookID) {

	return (dispatch) => {
		dispatch({
			type: "REQUEST_PENDING"
		});

		axios({
			method: "post",
			url: "/request",
			data: {
				username,
				bookID
			},
			headers: {
				"content-type": "application/json"
			}		
		}).then((res) => {
			// parse the requests
			parseRequests(dispatch, res.data.requests, res.data.requestNotifs);
		});
	};
}


export function cancelRequest(username, requestID) {
	return (dispatch) => {
		dispatch({
			type: "REQUEST_PENDING"
		});

		axios({
			method: "post",
			url: "/cancel_request",
			data: {
				username,
				requestID
			},
			headers: {
				"content-type": "application/json"
			}		
		}).then((res) => {
			// parse the requests
			parseRequests(dispatch, res.data.requests, res.data.requestNotifs);
		});
	};
}

function parseRequests(dispatch, requests, requestNotifs) {

	console.log("parsing request...");
	axios({
		method: "post",
		url: "/parse_request",
		data: {
			requests,
			requestNotifs
		}
	}).then((res) => {
		console.log("request res", res);
		dispatch({
			type: "REQUEST_PARSED",
			payload: res
		});
	}).catch((err) => {
		dispatch({
			type: "REQUEST_FAILED",
			payload: err
		});
	});
}
