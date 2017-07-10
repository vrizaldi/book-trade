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
		return {
			...state,
			status: "failed",
			error: action.payload.data
		};

	case "SIGNUP_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "SIGNUP_FULFILLED":
		return {
			...state,
			status: "succeed"
		};

	case "SIGNUP_REJECTED":
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
			
		
	default:
		return state;
	}
}