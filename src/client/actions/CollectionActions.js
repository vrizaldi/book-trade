import axios from "axios";

export function fetchCollection() {
	return {
		type: "FETCH_COLLECTION",
		payload: axios.get("/load_all")
	};
}