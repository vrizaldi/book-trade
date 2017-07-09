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
		var { _id, title, author, imageurl } = action.payload.data;
		books.push({
			_id,
			title,
			author,
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
			status: "failed",
			err: action.payload.data
		};

	case "FETCH_SHELF_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "FETCH_SHELF_FULFILLED":
		return {
			...state,
			status: "succeed",
			books: action.payload.data
		};

	case "FETCH_SHELF_REJECTED":
		return {
			...state,
			status: "failed",
			err: action.payload.data
		};

	case "REMOVE_BOOK_PENDING":
		return {
			...state,
			status: "fetching"
		};
	case "REMOVE_BOOK_FULFILLED":
		const { data } = action.payload;
		// remove book from the collection
		var books = state.books.filter((val) => {
			console.log("val id", val._id);
			return val._id != data;
		});
		return {
			...state,
			status: "succeed",
			books: books 
		};

	case "REMOVE_BOOK_REJECTED":
		return {
			...state,
			status: "failed",
			err: action.payload.data
		};

	default:
		return state;
	}
}