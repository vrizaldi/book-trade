import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import LoadingUser from "../pages/LoadingUser";

export default class Main extends React.Component {
	render() {
		return(
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/profile" component={Profile} />
					<Route path="/logging_in" component={LoadingUser} />
				</Switch>
			</div>
		);
	}
}