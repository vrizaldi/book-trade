const initialStates = {
	status: "idle",
	loggedIn: false,
	error: null,
	userData: {
		username: "",
		fullName: "",
		city: "",
		state: ""
	}
};

export default function reduce(state=initialStates, action) {
	switch(action.type) {
	case "LOGIN_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "LOGIN_FULFILLED":
		var { data } = action.payload;
		return {
			...state,
			status: "succeed",
			loggedIn: true,
			userData: {
				...state.userData,
				username: data.username,
				fullName: data.fullName,
				city: data.city,
				state: data.state
			}
		};

	case "LOGIN_REJECTED":
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
		
	default:
		return state;
	}
}