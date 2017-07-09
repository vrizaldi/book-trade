import { combineReducers } from "redux";

import user from "./userReducer";
import shelf from "./shelfReducer";
import collection from "./collectionReducer";

export default combineReducers({
	user,
	shelf,
	collection
});
