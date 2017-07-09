import { combineReducers } from "redux";

import user from "./userReducer";
import shelf from "./shelfReducer";

export default combineReducers({
	user,
	shelf
});
