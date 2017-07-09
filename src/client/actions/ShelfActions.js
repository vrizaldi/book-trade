import axios from "axios";

export function fetchShelf(username) {
	return {
		type: "FETCH_SHELF",
		payload: axios.get(`/load_shelf?username=${username}`)
	};
}

export function addBook(username, title, author) {
	return {
		type: "ADD_BOOK",
		payload: axios({
			method: "post",
			url: "/add_book",
			data: {
				username,
				title,
				author
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

export function removeBook(username, bookID) {
	return {
		type: "REMOVE_BOOK",
		payload: axios({
			method: "post",
			url: "/remove_book",
			data: {
				username,
				bookID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}
