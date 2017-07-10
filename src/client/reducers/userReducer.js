const initialStates = {
	status: "idle",
	loggedIn: false,
	error: null,
	userData: {
		username: "",
		fullName: "",
		city: "",
		state: "",
		requests: [],
		requestNotifs: []
	}
};

export default function reduce(state=initialStates, action) {
	switch(action.type) {
	case "LOGIN_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "USER_DATA_RECEIVED":
		var { data } = action.payload;
		return {
			...state,
			loggedIn: true,
			userData: {
				...state.userData,
				username: data.username,
				fullName: data.fullName,
				city: data.city,
				state: data.state
			}
		};

	case "USER_DATA_REJECTED":
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed",
			error: action.payload.data
		};

	case "SIGN_UP_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "SIGN_UP_FULFILLED":
		alert("Signup successful, now you can login!");
		return {
			...state,
			status: "succeed"
		};

	case "SIGN_UP_REJECTED":
		console.log("payload ");
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed"
		};

	case "REQUEST_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "REQUEST_PARSED":
		return {
			...state,
			status: "succeed",
			userData: {
				...state.userData,
				requests: action.payload.data.requests,
				requestNotifs: action.payload.data.requestNotifs
			}
		};

	case "REQUEST_FAILED":
		return {
			...state,
			status: "failed",
			err: action.payload.data
		};
			
	case "UPDATE_BIO_PENDING":
		return {
			...state,
			status: "fetching"
		};
		
	case "UPDATE_BIO_FULFILLED":
		var { fullName, city } = action.payload.data;
		return {
			...state,
			status: "succeed",
			userData: {
				...state.userData,
				fullName,
				city,
				state: action.payload.data.state
			}
		};

	case "UPDATE_BIO_REJECTED":
		alert(action.payload);
		return {
			...state,
			status: "failed"
		};

	default:
		return state;
	}
}