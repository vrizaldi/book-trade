import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import reducers from "./reducers";
import log from "./middlewares/log";
import error from "./middlewares/error";

const middlewares = applyMiddleware(thunk, promise(), log, error);
export default createStore(reducers, middlewares);