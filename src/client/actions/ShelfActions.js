import axios from "axios";

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