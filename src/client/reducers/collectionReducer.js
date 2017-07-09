const initialStates = {
	status: "idle",
	err: null,
	books: []
};

export default function reduce(state=initialStates, action) {
	switch(action.type) {
	case "FETCH_COLLECTION_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "FETCH_COLLECTION_FULFILLED":
		return {
			...state,
			status: "succeed",
			books: action.payload.data
		};

	case "FETCH_COLLECTION_REJECTED":
		return {
			...state,
			status: "failed",
			err: action.payload.data
		};

	default:
		return state;
	}
}