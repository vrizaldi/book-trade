const initialStates = {
	status: "idle",
	err: null,
	books: []
};

export default function reduce(state=initialStates, action) {
	switch(action.type) {
	case "ADD_BOOK_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "ADD_BOOK_FULFILLED":
		var books = state.books.splice(0);		// clone it
		var { bookID, title, imageurl } = action.payload.data;
		books.push({
			bookID,
			title,
			imageurl
		});

		return {
			...state,
			status: "succeed",
			books
		};

	case "ADD_BOOK_REJECTED":
		return {
			...state,
			err: action.payload.data
		};

	default:
		return state;
	}
}